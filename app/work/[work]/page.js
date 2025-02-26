import styles from './page.module.scss';
import { getProject } from '@/app/utils/sanity-utils.js';
import { PortableText } from '@portabletext/react';

const Project = async ({ params }) => {
  const { work } = await params;
  const project = await getProject(work);

  return (
    <div className={styles.page}>
      <div className={styles.page__wrapper}>
        <div className={styles.page__wrapper__title}>
          <div className={styles.page__wrapper__title__wrapper}>
            <h3>
              {project.title}
              {/* <span>
                &nbsp;|&nbsp;
                {project.category
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </span> */}
            </h3>
            <p>
              {project.subtitle}
              &emsp;
              <span>
                &nbsp;[&nbsp;
                {project.category
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
                &nbsp;]&nbsp;
              </span>
            </p>
          </div>
        </div>

        <div className={styles.page__wrapper__credits}>
          <PortableText value={project.credits} />
        </div>

        <div className={styles.page__wrapper__builder}>
          {/* add page builder content here */}
          {project.pageBuilder?.map((block, index) => {
            if (block._type === 'imageBlock') {
              return (
                <div
                  key={index}
                  className={`${styles.page__wrapper__builder__item} ${styles.page__wrapper__builder__image}`}
                >
                  <img src={block.imageUrl} alt='Page builder image' />
                </div>
              );
            }
            if (block._type === 'textBlock') {
              return (
                <div
                  key={index}
                  className={`${styles.page__wrapper__builder__item} ${styles.page__wrapper__builder__text}`}
                >
                  <PortableText value={block.text} />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      <div className={styles.page__video}>
        <video
          className={styles.page__video__media}
          muted
          loop
          autoPlay
          playsInline
        >
          <source src={project.heroUrl} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Project;
