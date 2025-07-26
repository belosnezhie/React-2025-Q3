import { JSX } from 'react';

import { Header } from '@/components';

import './about-page.css';

export const AboutPage = (): JSX.Element => {
  return (
    <>
      <Header pageType="about" />
      <main className="about_page">
        <div className="about_container">
          <img
            alt="photo"
            className="photo"
            src={
              'https://raw.githubusercontent.com/belosnezhie/eCommerce-Application-data/main/images/Photo/maria.JPG'
            }
          />
          <h2 className="title">Maria Treier</h2>
          <p className="bio">
            Frontend Developer with a keen eye for detail and a strong focus on
            creating seamless user experiences. I have honed my skills in
            building responsive and efficient web applications.
          </p>
          <div className="links_container">
            <a
              className="rss_link"
              href={`https://rs.school/`}
              rel="noopener noreferrer"
              target="_blank"
            />
            <a
              className="github_link"
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
