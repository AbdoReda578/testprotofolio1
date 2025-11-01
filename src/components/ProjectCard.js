import { Card, CardContent } from '@/components/ui/card';

export const ProjectCard = ({ title, description, imgUrl }) => {
  return (
    <Card className="group relative overflow-hidden bg-dark-secondary border-white/10 hover:border-primary-purple/50 transition-all cursor-pointer">
      <CardContent className="p-0 relative">
        <img
          src={imgUrl}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6">
          <h4 className="text-white text-2xl font-bold mb-2">{title}</h4>
          <span className="text-white/80 text-center">{description}</span>
        </div>
      </CardContent>
    </Card>
  )
}
