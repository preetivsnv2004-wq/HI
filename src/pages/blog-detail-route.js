import React from 'react';

const BlogDetailRoute = ({
  NavbarComponent,
  BlogDetailContent,
  FooterComponent,
  ScrollToTopComponent,
  post,
}) => (
  <div className="min-h-screen bg-white site-compact hdrx-fullbleed premium-blog-page">
    <NavbarComponent />
    <BlogDetailContent post={post} />
    <FooterComponent />
    <ScrollToTopComponent />
  </div>
);

export default BlogDetailRoute;
