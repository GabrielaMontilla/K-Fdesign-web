# Guía de Integración con Backend

Esta guía proporciona instrucciones detalladas para integrar K&F Design con servicios de backend reales.

## 📦 Opción 1: Firebase

### 1. Instalación

```bash
npm install firebase
```

### 2. Configuración

Crear `/src/app/lib/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
```

### 3. Actualizar AuthContext

```typescript
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

// En login:
const userCredential = await signInWithEmailAndPassword(auth, email, password);
const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));

// En register:
const userCredential = await createUserWithEmailAndPassword(auth, email, password);
await setDoc(doc(db, 'users', userCredential.user.uid), {
  name,
  email,
  role: email === 'estimating@k-fdesign.com' ? 'admin' : 'client',
  createdAt: new Date(),
});
```

### 4. Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId || 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.email == 'estimating@k-fdesign.com';
    }
    
    // Projects collection
    match /projects/{projectId} {
      allow read: if true;
      allow write: if request.auth != null && 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.email == 'estimating@k-fdesign.com';
      
      // Reviews subcollection
      match /reviews/{reviewId} {
        allow read: if true;
        allow create: if request.auth != null;
        allow update, delete: if request.auth != null && 
                                (request.auth.uid == resource.data.userId ||
                                 get(/databases/$(database)/documents/users/$(request.auth.uid)).data.email == 'estimating@k-fdesign.com');
      }
    }
    
    // Appointments collection
    match /appointments/{appointmentId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null && 
                                    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.email == 'estimating@k-fdesign.com';
    }
  }
}
```

### 5. Cloud Functions para Envío de Correos

Crear `/functions/src/index.ts`:

```typescript
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.password,
  },
});

// Notificar cuando se crea una nueva cotización
export const onAppointmentCreated = functions.firestore
  .document('appointments/{appointmentId}')
  .onCreate(async (snap, context) => {
    const appointment = snap.data();
    
    const mailOptions = {
      from: 'noreply@k-fdesign.com',
      to: 'estimating@k-fdesign.com',
      subject: 'Nueva Solicitud de Cotización - K&F Design',
      html: `
        <h2>Nueva Solicitud de Cotización</h2>
        <p><strong>Nombre:</strong> ${appointment.name}</p>
        <p><strong>Email:</strong> ${appointment.email}</p>
        <p><strong>Teléfono:</strong> ${appointment.phone}</p>
        <p><strong>Tipo de Servicio:</strong> ${appointment.serviceType}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${appointment.message}</p>
        <p><strong>Fecha:</strong> ${appointment.createdAt.toDate().toLocaleString('es-ES')}</p>
      `,
    };
    
    await transporter.sendMail(mailOptions);
  });

// Notificar cuando se publica una nueva reseña
export const onReviewCreated = functions.firestore
  .document('projects/{projectId}/reviews/{reviewId}')
  .onCreate(async (snap, context) => {
    const review = snap.data();
    const projectId = context.params.projectId;
    
    const projectDoc = await admin.firestore().doc(`projects/${projectId}`).get();
    const project = projectDoc.data();
    
    const mailOptions = {
      from: 'noreply@k-fdesign.com',
      to: 'estimating@k-fdesign.com',
      subject: 'Nueva Reseña Publicada - K&F Design',
      html: `
        <h2>Nueva Reseña</h2>
        <p><strong>Proyecto:</strong> ${project?.title}</p>
        <p><strong>Usuario:</strong> ${review.userName}</p>
        <p><strong>Calificación:</strong> ${'⭐'.repeat(review.rating)}</p>
        <p><strong>Comentario:</strong></p>
        <p>${review.comment}</p>
      `,
    };
    
    await transporter.sendMail(mailOptions);
  });
```

### 6. Configurar Credenciales de Email

```bash
firebase functions:config:set email.user="tu-email@gmail.com" email.password="tu-app-password"
```

---

## 📦 Opción 2: Supabase

### 1. Instalación

```bash
npm install @supabase/supabase-js
```

### 2. Configuración

Crear `/src/app/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 3. Schema de Base de Datos

```sql
-- Users table (extendiendo auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('client', 'admin')) DEFAULT 'client',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  images TEXT[] NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  comment TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Appointments table
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  service_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
```

### 4. Row Level Security Policies

```sql
-- Users policies
CREATE POLICY "Users can view their own data"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admin can view all users"
  ON public.users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND email = 'estimating@k-fdesign.com'
    )
  );

-- Projects policies
CREATE POLICY "Anyone can view projects"
  ON public.projects FOR SELECT
  USING (true);

CREATE POLICY "Only admin can manage projects"
  ON public.projects FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND email = 'estimating@k-fdesign.com'
    )
  );

-- Reviews policies
CREATE POLICY "Anyone can view reviews"
  ON public.reviews FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
  ON public.reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- Appointments policies
CREATE POLICY "Anyone can create appointments"
  ON public.appointments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only admin can view appointments"
  ON public.appointments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND email = 'estimating@k-fdesign.com'
    )
  );
```

### 5. Edge Functions para Correos (Supabase)

Crear función en el Dashboard de Supabase:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

serve(async (req) => {
  const { type, data } = await req.json();
  
  let emailContent;
  
  if (type === 'appointment') {
    emailContent = {
      from: 'noreply@k-fdesign.com',
      to: 'estimating@k-fdesign.com',
      subject: 'Nueva Solicitud de Cotización - K&F Design',
      html: `
        <h2>Nueva Solicitud de Cotización</h2>
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Teléfono:</strong> ${data.phone}</p>
        <p><strong>Tipo de Servicio:</strong> ${data.serviceType}</p>
        <p><strong>Mensaje:</strong> ${data.message}</p>
      `,
    };
  }
  
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify(emailContent),
  });
  
  const emailData = await res.json();
  
  return new Response(JSON.stringify(emailData), {
    headers: { 'Content-Type': 'application/json' },
  });
});
```

### 6. Actualizar AuthContext con Supabase

```typescript
import { supabase } from './supabase';

// En login:
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

// En register:
const { data: authData, error: authError } = await supabase.auth.signUp({
  email,
  password,
});

if (authData.user) {
  await supabase.from('users').insert({
    id: authData.user.id,
    name,
    email,
    role: email === 'estimating@k-fdesign.com' ? 'admin' : 'client',
  });
}

// Listener de cambios de auth:
useEffect(() => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      if (session?.user) {
        const { data } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setUser(data);
      } else {
        setUser(null);
      }
    }
  );

  return () => subscription.unsubscribe();
}, []);
```

---

## 🔧 Opción 3: Backend Custom (Node.js + Express)

### 1. Estructura Backend

```
/backend
  /src
    /controllers
      authController.ts
      projectsController.ts
      reviewsController.ts
      appointmentsController.ts
    /middleware
      auth.ts
      admin.ts
    /models
      User.ts
      Project.ts
      Review.ts
      Appointment.ts
    /routes
      auth.ts
      projects.ts
      reviews.ts
      appointments.ts
    /services
      emailService.ts
    app.ts
    server.ts
```

### 2. Ejemplo de API Endpoints

```typescript
// POST /api/auth/register
// POST /api/auth/login
// POST /api/auth/logout

// GET /api/projects
// GET /api/projects/:id
// POST /api/projects (admin only)
// PUT /api/projects/:id (admin only)
// DELETE /api/projects/:id (admin only)

// GET /api/projects/:id/reviews
// POST /api/projects/:id/reviews (authenticated)
// PUT /api/reviews/:id (owner or admin)
// DELETE /api/reviews/:id (owner or admin)

// GET /api/appointments (admin only)
// POST /api/appointments
// PUT /api/appointments/:id (admin only)
// DELETE /api/appointments/:id (admin only)

// GET /api/users (admin only)
// GET /api/users/:id (self or admin)
```

### 3. Servicio de Email con SendGrid

```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendAppointmentEmail(appointment: Appointment) {
  const msg = {
    to: 'estimating@k-fdesign.com',
    from: 'noreply@k-fdesign.com',
    subject: 'Nueva Solicitud de Cotización - K&F Design',
    html: `
      <h2>Nueva Solicitud de Cotización</h2>
      <p><strong>Nombre:</strong> ${appointment.name}</p>
      <p><strong>Email:</strong> ${appointment.email}</p>
      <p><strong>Teléfono:</strong> ${appointment.phone}</p>
      <p><strong>Tipo de Servicio:</strong> ${appointment.serviceType}</p>
      <p><strong>Mensaje:</strong> ${appointment.message}</p>
    `,
  };
  
  await sgMail.send(msg);
}
```

---

## 📧 Servicios de Email Recomendados

### 1. SendGrid
- Gratuito hasta 100 emails/día
- Fácil integración
- Plantillas HTML

### 2. Resend
- Moderno y developer-friendly
- Excelente para Next.js/React

### 3. Mailgun
- Robusto para alto volumen
- APIs potentes

### 4. Nodemailer + Gmail
- Gratuito
- Bueno para desarrollo/pruebas
- Requiere "App Password" de Gmail

---

## 🚀 Checklist de Integración

- [ ] Elegir backend (Firebase/Supabase/Custom)
- [ ] Instalar dependencias necesarias
- [ ] Configurar variables de entorno
- [ ] Implementar autenticación real
- [ ] Migrar datos mock a base de datos
- [ ] Configurar reglas de seguridad
- [ ] Implementar sistema de correo
- [ ] Configurar almacenamiento de imágenes
- [ ] Implementar manejo de errores
- [ ] Agregar validación de datos
- [ ] Testear en ambiente de desarrollo
- [ ] Configurar CI/CD
- [ ] Deploy a producción

---

## 🔐 Variables de Entorno

Crear archivo `.env` en la raíz:

```env
# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Supabase
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# Email Service
VITE_SENDGRID_API_KEY=
VITE_RESEND_API_KEY=

# Custom Backend
VITE_API_URL=
```

**⚠️ IMPORTANTE**: Nunca commitear el archivo `.env` al repositorio. Agregarlo a `.gitignore`.

---

## 📚 Recursos Adicionales

- [Firebase Docs](https://firebase.google.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [SendGrid Docs](https://docs.sendgrid.com/)
- [Resend Docs](https://resend.com/docs)
- [React Router Docs](https://reactrouter.com/)
