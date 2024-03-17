import { Link } from 'react-router-dom';
import notFoundImage from '../assets/notfound.gif'; // Import the image

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center  text-white">
      <img
        src={notFoundImage}
        alt="404 Not Found"
        className="h-100 w-100 mb-6"
      />
       
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;
