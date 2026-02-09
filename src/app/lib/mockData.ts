export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'admin';
  createdAt: Date;
}

export interface Review {
  id: string;
  projectId: string;
  userId: string;
  userName: string;
  comment: string;
  rating: number;
  createdAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  images: string[];
  rating: number;
  category: string;
  createdAt: Date;
}

export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  serviceType: string;
  createdAt: Date;
}

// Mock Projects Data
export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Remodelación de Cocina Moderna',
    description: 'Transformación completa de cocina con acabados de lujo',
    fullDescription: 'Proyecto completo de remodelación de cocina moderna con acabados premium. Incluye instalación de gabinetes personalizados, encimeras de cuarzo, electrodomésticos de acero inoxidable y un diseño abierto que maximiza el espacio y la funcionalidad.',
    images: ['https://images.unsplash.com/photo-1585261450736-67d578ff00b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwa2l0Y2hlbiUyMHJlbW9kZWxpbmd8ZW58MXx8fHwxNzcwNjA3NDY5fDA&ixlib=rb-4.1.0&q=80&w=1080'],
    rating: 5,
    category: 'Residencial',
    createdAt: new Date('2024-12-15'),
  },
  {
    id: '2',
    title: 'Baño de Lujo Contemporáneo',
    description: 'Renovación completa con acabados premium y spa',
    fullDescription: 'Renovación integral de baño principal con características de spa de lujo. Incluye bañera independiente, ducha de lluvia, pisos radiantes, gabinetes personalizados y acabados en mármol.',
    images: ['https://images.unsplash.com/photo-1762418362644-a4daad168fb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXRocm9vbSUyMHJlbm92YXRpb258ZW58MXx8fHwxNzcwNTY5Nzc2fDA&ixlib=rb-4.1.0&q=80&w=1080'],
    rating: 5,
    category: 'Residencial',
    createdAt: new Date('2024-11-20'),
  },
  {
    id: '3',
    title: 'Oficina Corporativa Moderna',
    description: 'Remodelación completa de espacio comercial',
    fullDescription: 'Transformación de espacio de oficina comercial con diseño moderno y funcional. Incluye espacios de trabajo abiertos, salas de reuniones privadas, áreas de descanso y sistemas de iluminación inteligente.',
    images: ['https://images.unsplash.com/photo-1770200574989-a4cca2c70c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwb2ZmaWNlJTIwcmVub3ZhdGlvbnxlbnwxfHx8fDE3NzA2MDc0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080'],
    rating: 4.8,
    category: 'Comercial',
    createdAt: new Date('2024-10-10'),
  },
  {
    id: '4',
    title: 'Sala de Estar Elegante',
    description: 'Diseño minimalista con toques contemporáneos',
    fullDescription: 'Remodelación de sala de estar con enfoque minimalista y elegante. Incluye pisos de madera, iluminación empotrada, chimenea moderna y paleta de colores neutros que crean un ambiente acogedor y sofisticado.',
    images: ['https://images.unsplash.com/photo-1763485956294-407e7388f63b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGxpdmluZyUyMHJvb20lMjByZW1vZGVsfGVufDF8fHx8MTc3MDYwNzQ3MXww&ixlib=rb-4.1.0&q=80&w=1080'],
    rating: 4.9,
    category: 'Residencial',
    createdAt: new Date('2025-01-05'),
  },
  {
    id: '5',
    title: 'Dormitorio Principal de Ensueño',
    description: 'Espacio de descanso lujoso y confortable',
    fullDescription: 'Remodelación completa de dormitorio principal con diseño elegante y funcional. Incluye vestidor personalizado, área de tocador, iluminación ambiental y acabados de alta calidad que crean un refugio perfecto.',
    images: ['https://images.unsplash.com/photo-1765434669989-10e45046085c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYmVkcm9vbSUyMGRlc2lnbiUyMHJlbm92YXRpb258ZW58MXx8fHwxNzcwNjA3NDcxfDA&ixlib=rb-4.1.0&q=80&w=1080'],
    rating: 5,
    category: 'Residencial',
    createdAt: new Date('2025-01-20'),
  },
  {
    id: '6',
    title: 'Renovación Interior de Lujo',
    description: 'Proyecto integral de remodelación residencial',
    fullDescription: 'Proyecto completo de remodelación que incluye todas las áreas principales de la vivienda. Diseño integral que combina elegancia, funcionalidad y confort en cada espacio.',
    images: ['https://images.unsplash.com/photo-1758998202918-d921125a700f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBpbnRlcmlvciUyMHJlbm92YXRpb258ZW58MXx8fHwxNzcwNjA3NDY5fDA&ixlib=rb-4.1.0&q=80&w=1080'],
    rating: 4.9,
    category: 'Residencial',
    createdAt: new Date('2025-02-01'),
  },
];

// Mock Reviews Data
export const mockReviews: Review[] = [
  {
    id: '1',
    projectId: '1',
    userId: 'user1',
    userName: 'María González',
    comment: '¡Excelente trabajo! Superaron todas mis expectativas. La cocina quedó hermosa y funcional.',
    rating: 5,
    createdAt: new Date('2024-12-20'),
  },
  {
    id: '2',
    projectId: '1',
    userId: 'user2',
    userName: 'Carlos Ramírez',
    comment: 'Muy profesionales y atentos a cada detalle. Recomendados 100%.',
    rating: 5,
    createdAt: new Date('2024-12-22'),
  },
  {
    id: '3',
    projectId: '2',
    userId: 'user3',
    userName: 'Ana Martínez',
    comment: 'Mi baño quedó como un spa de lujo. Estoy encantada con el resultado.',
    rating: 5,
    createdAt: new Date('2024-11-25'),
  },
  {
    id: '4',
    projectId: '3',
    userId: 'user4',
    userName: 'Roberto Sánchez',
    comment: 'Transformaron nuestra oficina completamente. El equipo es muy profesional.',
    rating: 5,
    createdAt: new Date('2024-10-15'),
  },
  {
    id: '5',
    projectId: '4',
    userId: 'user5',
    userName: 'Laura Hernández',
    comment: 'La sala de estar quedó perfecta. Diseño elegante y moderno.',
    rating: 5,
    createdAt: new Date('2025-01-10'),
  },
  {
    id: '6',
    projectId: '5',
    userId: 'user6',
    userName: 'Pedro Torres',
    comment: 'El dormitorio quedó hermoso. Excelente atención al detalle.',
    rating: 5,
    createdAt: new Date('2025-01-25'),
  },
];

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: 'admin1',
    name: 'K&F Admin',
    email: 'estimating@k-fdesign.com',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'user1',
    name: 'María González',
    email: 'maria@example.com',
    role: 'client',
    createdAt: new Date('2024-12-10'),
  },
  {
    id: 'user2',
    name: 'Carlos Ramírez',
    email: 'carlos@example.com',
    role: 'client',
    createdAt: new Date('2024-11-15'),
  },
];

// Mock Appointments Data
export const mockAppointments: Appointment[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '555-0123',
    message: 'Necesito una cotización para remodelar mi cocina',
    serviceType: 'Remodelación de Cocina',
    createdAt: new Date('2025-02-08'),
  },
  {
    id: '2',
    name: 'Sofia López',
    email: 'sofia@example.com',
    phone: '555-0456',
    message: 'Quiero renovar el baño principal',
    serviceType: 'Remodelación de Baño',
    createdAt: new Date('2025-02-07'),
  },
];
