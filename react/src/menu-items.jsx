const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'TransportationIQ',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'typography',
          title: 'Home',
          type: 'item',
          icon: 'feather icon-home',
          url: '/home'
        },
      ]
    },
    {
      id: 'utilities',
      title: 'Dashboards',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'component',
          title: 'Data Visualization',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'button',
              title: 'Overview',
              type: 'item',
              url: '/dashboard'
            },
            {
              id: 'badges',
              title: 'Pothole Detection',
              type: 'item',
              url: '/pothole_detection'
            },
            {
              id: 'breadcrumb-pagination',
              title: 'Crack Detection',
              type: 'item',
              url: '/crack_detection'
            },
            {
              id: 'collapse',
              title: 'Illegal Dumping',
              type: 'item',
              url: '/illegal_dumping'
            },
            {
              id: 'dashboard',
              title: 'Car Accidents',
              type: 'item',
              url: '/car_accidents'
            },
            {
              id: 'button',
              title: 'Construction',
              type: 'item',
              url: '/construction'
            },
            {
              id: 'tooltip-popovers',
              title: 'Wildlife Detection',
              type: 'item',
              url: '/wildlife_detection'
            }
          ]
        }
      ]
    },
    {
      id: 'auth',
      title: 'Authentication',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'sign in',
          title: 'Login',
          type: 'item',
          icon: 'feather icon-lock',
          url: '/auth/signin-1',
          target: true,
          breadcrumbs: false
        },
        {
          id: 'sign Up',
          title: 'Register',
          type: 'item',
          icon: 'feather icon-log-in',
          url: '/auth/signup-1',
          target: true,
          breadcrumbs: false
        },
        {
          id: 'reset-pass',
          title: 'Reset Password',
          type: 'item',
          icon: 'feather icon-unlock',
          url: '/auth/reset-password-1',
          target: true,
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'support',
      title: 'Support',
      type: 'group',
      icon: 'icon-support',
      children: [
        {
          id: 'sample-page',
          title: 'Quick Review',
          type: 'item',
          url: '/sample-page',
          classes: 'nav-item',
          icon: 'feather icon-sidebar'
        },
        {
          id: 'documentation',
          title: 'About Us',
          type: 'item',
          icon: 'feather icon-help-circle',
          classes: 'nav-item',
          url: '/about-us',
          target: false,
          external: false
        }
      ]
    }
  ]
};

export default menuItems;
