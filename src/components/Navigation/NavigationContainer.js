import React, {Component, PropTypes} from 'react';
import 'gsap';

export default class NavigationContainer extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  componentDidMount() {
  }

  componentWillAppear(onComplete) {
    const anchors = this.refs.nav.querySelectorAll('a');
    const logo = this.refs.nav.querySelector('i');

    TweenMax.staggerFrom(anchors, 0.3, {
      autoAlpha: 0,
      scale: 0.8,
      x: '-10',
      y: '18',
      delay: 0.15,
    }, -0.03);

    TweenLite.from(logo, 0.6, {
      autoAlpha: 0,
      delay: 0.5,
      ease: Linear.easeNone,
      onComplete
    });
  }


  render() {
    return (
      <div ref="nav">
        {this.props.children}
      </div>
    );
  }
}