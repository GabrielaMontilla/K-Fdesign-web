import { useParams, useNavigate, Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Star, ArrowLeft, Calendar } from 'lucide-react';
import { mockProjects, mockReviews, Review } from '../lib/mockData';
import { useAuth } from '../lib/authContext';
import { useState } from 'react';
import { toast } from 'sonner';

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [projectReviews, setProjectReviews] = useState<Review[]>(
    mockReviews.filter(r => r.projectId === id)
  );

  const project = mockProjects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Proyecto no encontrado</h1>
        <Button onClick={() => navigate('/projects')}>Volver a Proyectos</Button>
      </div>
    );
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Debes iniciar sesión para dejar un comentario');
      return;
    }

    const newReview: Review = {
      id: `review-${Date.now()}`,
      projectId: project.id,
      userId: user.id,
      userName: user.name,
      comment,
      rating,
      createdAt: new Date(),
    };

    setProjectReviews([newReview, ...projectReviews]);
    mockReviews.push(newReview);

    toast.success('¡Comentario publicado!');
    setComment('');
    setRating(5);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate('/projects')} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a Proyectos
      </Button>

      {/* Project Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
            <div className="flex items-center gap-4">
              <Badge>{project.category}</Badge>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(project.rating)
                        ? 'fill-primary text-primary'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 font-medium">{project.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
          <Button size="lg" onClick={() => navigate('/#contact')}>
            Solicitar Cotización
          </Button>
        </div>
        <p className="text-muted-foreground flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {project.createdAt.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Project Images */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.images.map((image, index) => (
            <div
              key={index}
              className={`${
                index === 0 ? 'md:col-span-2' : ''
              } aspect-video overflow-hidden rounded-lg`}
            >
              <img
                src={image}
                alt={`${project.title} - Imagen ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Project Description */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Descripción del Proyecto</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="leading-relaxed">{project.fullDescription}</p>
          </CardContent>
        </Card>
      </div>

      {/* Reviews Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          Reseñas ({projectReviews.length})
        </h2>

        {/* Review Form */}
        {user ? (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium">Tu Calificación</label>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(i + 1)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            i < rating ? 'fill-primary text-primary' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="comment" className="block mb-2 font-medium">
                    Tu Comentario
                  </label>
                  <Textarea
                    id="comment"
                    rows={4}
                    placeholder="Comparte tu opinión sobre este proyecto..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit">Publicar Comentario</Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-8">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground mb-4">
                Debes iniciar sesión para dejar un comentario
              </p>
              <Link to="/login">
                <Button>Iniciar Sesión</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {projectReviews.length > 0 ? (
            projectReviews.map(review => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">{review.userName}</p>
                      <p className="text-sm text-muted-foreground">
                        {review.createdAt.toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'fill-primary text-primary'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="leading-relaxed">{review.comment}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No hay reseñas aún. ¡Sé el primero en comentar!
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
