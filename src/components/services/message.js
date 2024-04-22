import toast from 'react-hot-toast';

function message() {
  toast(
    'Sorry, there are no images matching your search query. Please try again!',
    {
      duration: 5000,
      position: 'top-right',
      style: {
        background: '#ffa500',
        color: '#fff',
      },
    }
  );
}

export default message;
