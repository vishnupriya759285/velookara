import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { usePanchayat } from '../lib/PanchayatContext';

export default function Footer() {
  const { selectedPanchayat, selectedDistrict, isSelected } = usePanchayat();
  const panchayatName = isSelected ? `${selectedPanchayat} Panchayat` : 'Kerala Panchayat Portal';
  const locationText = isSelected ? `${selectedDistrict} District` : 'Kerala';

  return (
    <footer className="bg-gray-800 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white mb-4">{panchayatName}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Serving the people of {isSelected ? `${selectedPanchayat} and surrounding areas in ${selectedDistrict} District` : 'all panchayats across'} Kerala. 
              Committed to transparent governance and community development.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 text-green-400 flex-shrink-0" />
                <span>{panchayatName} Office<br />{locationText}<br />Kerala</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span>Contact your local panchayat office</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span>info@lsgkerala.gov.in</span>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div>
            <h3 className="text-white mb-4">Office Hours</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <Clock className="h-4 w-4 mt-0.5 text-green-400 flex-shrink-0" />
                <div>
                  <div>Monday - Friday: 9:00 AM - 5:00 PM</div>
                  <div className="text-gray-400 mt-1">Saturday: 9:00 AM - 1:00 PM</div>
                  <div className="text-gray-400">Sunday: Closed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {panchayatName}. All rights reserved.</p>
          <p className="mt-2">Developed for rural community empowerment and transparent governance.</p>
        </div>
      </div>
    </footer>
  );
}
