import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../lib/authContext';
import { mockReviews } from '../lib/mockData';
import { User, Mail, Calendar, LogOut, Star } from 'lucide-react';
import { useEffect } from 'react';

export function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const userReviews = mockReviews.filter(r => r.userId === user.id);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Mi Perfil</h1>

        {/* User Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-lg">{user.name}</p>
                <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                  {user.role === 'admin' ? 'Administrador' : 'Cliente'}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Miembro desde{' '}
                  {user.createdAt.toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* User Reviews Card */}
        <Card>
          <CardHeader>
            <CardTitle>Mis Comentarios ({userReviews.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {userReviews.length > 0 ? (
              <div className="space-y-4">
                {userReviews.map(review => (
                  <div key={review.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
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
                      <p className="text-sm text-muted-foreground">
                        {review.createdAt.toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <p className="mb-2">{review.comment}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/projects/${review.projectId}`)}
                    >
                      Ver Proyecto
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Aún no has dejado comentarios en ningún proyecto.</p>
                <Button
                  className="mt-4"
                  onClick={() => navigate('/projects')}
                >
                  Explorar Proyectos
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
