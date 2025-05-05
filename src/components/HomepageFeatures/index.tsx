import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
   {
    title: 'Based on Dart',
    Svg: require('@site/static/img/dart.svg').default,
    description: (
      <>
        Leverage the full power of Dart on the server, with native async/await,
        strong typing.
      </>
    ),
  },
  {
    title: 'Routing via Annotations',
    Svg: require('@site/static/img/ratel_body.svg').default, 
    description: (
      <>
        Define HTTP routes declaratively with annotations like{' '}
        <code>@Get()</code>, <code>@Post()</code>, <code>@Put()</code>, <code>@Delete()</code> directly on your controller methods.
      </>
    ),
  },
  {
    title: 'Easy Endpoint Creation',
    Svg: require('@site/static/img/ratel_hexagono.svg').default, 
    description: (
      <>
        Spin up RESTful endpoints in seconds with minimal boilerplate and
        clear conventions.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
