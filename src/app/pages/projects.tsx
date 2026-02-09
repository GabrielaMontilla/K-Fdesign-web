import { useState } from 'react';
import { ProjectCard } from '../components/project-card';
import { Button } from '../components/ui/button';
import { mockProjects } from '../lib/mockData';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';

export function Projects() {
  const [category, setCategory] = useState<string>('all');
  const [displayCount, setDisplayCount] = useState(6);

  const filteredProjects = category === 'all'
    ? mockProjects
    : mockProjects.filter(p => p.category.toLowerCase() === category);

  const displayedProjects = filteredProjects.slice(0, displayCount);
  const hasMore = displayCount < filteredProjects.length;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestros Proyectos</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explora nuestra galería de proyectos completados y descubre la calidad de nuestro trabajo
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center mb-8">
        <Tabs value={category} onValueChange={setCategory} className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="residencial">Residencial</TabsTrigger>
            <TabsTrigger value="comercial">Comercial</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {displayedProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            onClick={() => setDisplayCount(prev => prev + 6)}
          >
            Cargar Más Proyectos
          </Button>
        </div>
      )}

      {/* No Results */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron proyectos en esta categoría.</p>
        </div>
      )}
    </div>
  );
}
