import React from 'react';

const AboutRoute = ({
  NavbarComponent,
  AboutContent,
  ReviewsComponent,
  FooterComponent,
  ScrollToTopComponent,
}) => (
  <div className="min-h-screen bg-white site-compact premium-about-page hdrx-fullbleed">
    <NavbarComponent />
    <AboutContent />
    <ReviewsComponent />
    <FooterComponent />
    <ScrollToTopComponent />
  </div>
);

export default AboutRoute;
