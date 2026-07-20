import React from 'react';

const BlogRoute = ({
  NavbarComponent,
  BlogContent,
  FooterComponent,
  ScrollToTopComponent,
}) => (
  <div className="min-h-screen bg-white site-compact premium-blog-page hdrx-fullbleed">
    <NavbarComponent />
    <BlogContent />
    <FooterComponent />
    <ScrollToTopComponent />
  </div>
);

export default BlogRoute;
