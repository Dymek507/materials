type ActionCardProps = {
  title: string;
  image: string;
  description: string;
};

export default function ActionCard({ title, image, description }: ActionCardProps) {
  return (
    <div className="overflow-hidden duration-300 transform bg-white rounded-lg shadow-md mt-11 w-80 dark:bg-slate-800 hover:scale-105 hover:shadow-lg">
      <img className="object-cover object-center w-full h-72" src={image} alt={title} />
      <div className="p-4">
        <h2 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">{title}</h2>
        <p className="mb-2 text-base text-gray-700 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
}
