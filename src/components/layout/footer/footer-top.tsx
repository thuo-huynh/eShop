import { MapPin, Phone } from 'lucide-react';
import React from 'react';
import ContactItem from './contact-item';

type Props = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
};

const data: Props[] = [
  {
    title: 'Visit Us',
    subtitle: 'Da Nang, VN',
    icon: <MapPin className="text-gray-600 group-hover:text-darkColor transition-colors" />,
  },
  {
    title: 'Call Us',
    subtitle: '+84 934 534 198',
    icon: <Phone className="text-gray-600 group-hover:text-darkColor transition-colors" />,
  },
  {
    title: 'Working Hours',
    subtitle: 'Mon - Sat: 10:00 AM - 7:00 PM',
    icon: <MapPin className="text-gray-600 group-hover:text-darkColor transition-colors" />,
  },
  {
    title: 'Email Us',
    subtitle: 'huynhngocthuong0208@gmail.com',
    icon: <MapPin className="text-gray-600 group-hover:text-darkColor transition-colors" />,
  },
];

function FooterTop() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 border-b">
      {data?.map((item, index) => (
        <ContactItem
          key={index}
          icon={item?.icon}
          title={item?.title}
          subtitle={item?.subtitle}
        />
      ))}
    </div>
  );
}

export default FooterTop;
