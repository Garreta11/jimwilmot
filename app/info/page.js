import styles from './page.module.scss';
import { getAboutpage } from '../utils/sanity-utils';
import InfoWrapper from './info';

export const dynamic = 'force-dynamic';

const Info = async () => {
  const about = await getAboutpage('singleton-about');
  return <InfoWrapper data={about} />;
};

export default Info;
