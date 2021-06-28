import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Feel Free To Explore With</span>
        <span className="headerTitleLg">BLOGWEB</span>
      </div>
      <img
        className="headerImg"
        src="https://www.buy-targeted-views.com/wp-content/uploads/2015/10/office-desktop-background-image_01.jpg"
        alt="blog"
      />
    </div>
  );
}