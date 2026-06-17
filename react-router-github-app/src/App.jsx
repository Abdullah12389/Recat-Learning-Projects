import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter, RouterProvider, Outlet, NavLink, 
  useParams, useLoaderData 
} from 'react-router-dom';
const Header = () => (
  <nav className="bg-gray-800 p-4 text-white flex gap-4">
    {['/', '/about', '/contact', '/user/johndoe', '/github'].map(path => (
      <NavLink 
        key={path} 
        to={path}
        className={({ isActive }) => isActive ? "text-orange-500 font-bold" : "text-white"}
      >
        {path === '/' ? 'Home' : path.split('/')[1].toUpperCase()}
      </NavLink>
    ))}
  </nav>
);

const Footer = () => <footer className="bg-gray-200 p-4 text-center mt-auto">© 2026 Router App</footer>;

const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow p-8"><Outlet /></main>
    <Footer />
  </div>
);


const Home = () => <h1>Home Page</h1>;
const About = () => <h1>About Us</h1>;
const Contact = () => <h1>Contact Page</h1>;

const User = () => {
  const { userid } = useParams();
  return <h1>User Profile: {userid}</h1>;
};

const GithubEffect = () => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch('https://api.github.com/users/octocat')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);
  return <div>{data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}</div>;
};

const GithubLoaderPage = () => {
  const data = useLoaderData();
  return <div><h2>Loader Data:</h2><pre>{JSON.stringify(data, null, 2)}</pre></div>;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'user/:userid', element: <User /> },
      { path: 'github', element: <GithubEffect /> },
      { 
        path: 'github-loader', 
        element: <GithubLoaderPage />,
        loader: async () => {
          const res = await fetch('https://api.github.com/users/octocat');
          return res.json();
        }
      }
    ]
  }
]);
