import { Link } from 'react-router-dom';

interface NewsItem {
    title: string;
    date: string;
    description: string;
  }

// add sample items
const sampleItems: NewsItem[] = [
  { title: 'Sample Item 1', date: '2024-11-15', description: 'Sample description 1' },
  { title: 'Sample Item 2', date: '2024-11-14', description: 'Sample description 2' },
];

  export const ArchiveList = () => {
    return (
      <div className="space-y-6">
        {sampleItems.map((item, index) => (
          <Link 
            to={`/articles?date=${encodeURIComponent(item.date)}`}
            key={index} 
            className="block border-b border-gray-200 pb-6 last:border-0 hover:bg-gray-50 transition-colors p-4 rounded-lg"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <span className="text-gray-500">{item.date}</span>
            </div>
            <p className="text-gray-600 mt-2">{item.description}</p>
          </Link>
        ))}
      </div>
    );
  };