import React from 'react';

import { Header } from '@/components';

export const AboutPage = (): React.ReactElement => {
  return (
    <>
      <Header pageType="about" />
      <main
        className="min-h-[85vh] p-[2%] flex justify-center items-center gap-[1em] flex-wrap bg-main-background"
        data-testid="about_page"
      >
        <div className="max-w-[400px] flex flex-wrap gap-5 justify-center h-full text-black">
          <img
            alt="photo"
            className="block w-[200px] h-[200px] rounded-full object-cover mx-auto"
            src={
              'https://raw.githubusercontent.com/belosnezhie/eCommerce-Application-data/main/images/Photo/maria.JPG'
            }
          />
          <h2>Maria Treier</h2>
          <p>
            Frontend Developer with a keen eye for detail and a strong focus on
            creating seamless user experiences. I have honed my skills in
            building responsive and efficient web applications.
          </p>
          <div className="w-full flex items-center justify-between">
            <a
              className="
              h-[60px]
              w-[100px]
              bg-[url('https://raw.githubusercontent.com/rolling-scopes/rsschool-app/refs/heads/master/client/public/static/images/logo-rsschool.svg')]
              bg-center
              bg-contain
              bg-no-repeat
              transition-transform
              duration-300
              hover:scale-[0.90]"
              href={`https://rs.school/`}
              rel="noopener noreferrer"
              target="_blank"
            />
            <a
              className="
              h-[60px]
              w-[60px]
              bg-[url('/src/assets/github-mark.svg')]
              bg-center
              bg-contain
              bg-no-repeat
              transition-transform
              duration-300
              hover:scale-[0.90]"
              href={`https://github.com/belosnezhie`}
              rel="noopener noreferrer"
              target="_blank"
            />
          </div>
        </div>
      </main>
    </>
  );
};
