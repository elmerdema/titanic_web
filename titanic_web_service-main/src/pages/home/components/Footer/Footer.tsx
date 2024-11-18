let our_team = [
  {
    name: 'Amin Akziz (@aa16319)',
    href: 'https://mygit.th-deg.de/aa16319',
  },
  {
    name: 'Delian Brahushi (@db27960)',
    href: 'https://mygit.th-deg.de/db27960',
  },
  {
    name: 'Egi Merdani (@em28273)',
    href: 'https://mygit.th-deg.de/em28273',
  },
  {
    name: 'Elmer Dema (@ed01551)',
    href: 'https://mygit.th-deg.de/ed01551',
  },
  {
    name: 'Juled Zaganjori (@jz19337)',
    href: 'https://mygit.th-deg.de/jz19337',
  },
  {
    name: 'Julian Hoffmann (@jh30475)',
    href: 'https://mygit.th-deg.de/jh30475',
  },
  {
    name: 'Palina Dzenisiuk (@pd29926)',
    href: 'https://mygit.th-deg.de/pd29926',
  },
  {
    name: 'Stephan Karas (@sk16952)',
    href: 'https://mygit.th-deg.de/sk16952',
  },
];

export default function Footer() {
  return (
    <footer className='bg-gray-50' aria-labelledby='footer-heading'>
      <h2 id='footer-heading' className='sr-only'>
        Footer
      </h2>
      <div className='max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:pt-24 lg:px-8'>
        <div className='xl:grid xl:grid-cols-3 xl:gap-8'>
          <div className='grid grid-cols-2 gap-8 xl:col-span-2'>
            <div className='md:grid md:grid-cols-1 md:gap-8'>
              <div>
                <h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase'>Our Team</h3>
                <ul className='mt-4 space-y-4'>
                  {our_team.map(item => (
                    <li key={item.name}>
                      <a href={item.href} className='text-base text-gray-500 hover:text-gray-900'>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className='mt-12 xl:mt-0'>
            <h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase'>Carpathia</h3>
            <p className='mt-4 text-base text-gray-500'>
              The Titanic Survivor Predictor is a project developed by a group of students from the{' '}
              <a href='https://www.th-deg.de/' className='text-indigo-600 hover:text-indigo-700'>
                Deggendorf Institute of Technology
              </a>{' '}
              as part of the course "Software Engineering".{' '}
            </p>
            <p className='mt-4 text-base text-gray-500'>
              The project is based on the{' '}
              <a href='https://www.kaggle.com/c/titanic' className='text-indigo-600 hover:text-indigo-700'>
                {' '}
                Titanic dataset
              </a>
              .
            </p>
          </div>
        </div>
        <div className='mt-12 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between lg:mt-16'>
          <p className='mt-8 text-base text-gray-400 md:mt-0 md:order-1'>&copy; 2024 Carpathia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
