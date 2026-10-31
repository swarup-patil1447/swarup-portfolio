import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Card from './components/Card.jsx';
import Button from './components/Button.jsx';
import Form from './components/Form.jsx';
import posts from './data/posts.json';

function Portfolio() {
  return <>
    <section className="hero">
      <div><p className="eyebrow">FRONTEND DEVELOPER · LEARNER</p><h1>Building useful things<br/><span>for the web.</span></h1>
        <p className="lead">Hello! I'm Swarup Patil, a third-year B.Sc. Computer Science student building responsive websites with HTML, CSS, JavaScript, and React.</p>
        <a className="button anchor-button" href="#contact">Contact me</a></div>
      <div className="hero-panel"><div className="avatar">SP</div><p className="panel-label">CURRENTLY LEARNING</p><h2>HTML · CSS · JS · React</h2><p>Small steps. Real projects.</p></div>
    </section>
    <section className="section" id="about"><div className="section-heading"><p className="eyebrow">ABOUT</p><h2>A little about me</h2></div><div className="two-column"><Card title="My introduction" badge="About"><p>I'm Swarup Patil, a third-year B.Sc. Computer Science student interested in front-end development. I enjoy building responsive, user-friendly websites and improving my skills through practical projects.</p></Card><Card title="What I'm learning" badge="Skills"><div className="tag-list">{['HTML5','CSS3','Flexbox','CSS Grid','JavaScript ES6+','React','Props & State'].map(x=><span className="tag" key={x}>{x}</span>)}</div></Card></div></section>
    <section className="section tint"><div className="section-heading"><p className="eyebrow">EDUCATION</p><h2>Learning journey</h2></div><div className="timeline"><div><span className="timeline-dot"></span><p className="timeline-date">Current</p><h3>B.Sc. Computer Science — Third Year</h3><p>Currently studying Computer Science and building practical front-end development skills.</p></div><div><span className="timeline-dot"></span><p className="timeline-date">Next goal</p><h3>Build and deploy projects</h3><p>Continue learning APIs, backend development, and database fundamentals.</p></div></div></section>
    <section className="section"><div className="section-heading"><p className="eyebrow">PROJECTS</p><h2>Practice projects</h2></div><div className="three-column"><Card title="BroCode Gaming Hub" badge="Live Project"><p>A gaming-themed website project.</p><a className="read-more" href="https://brocode-gaming-hub.pages.dev/" target="_blank" rel="noreferrer">Visit live website ↗</a></Card><Card title="Week 1 Frontend Practice" badge="HTML + CSS + JS"><p>Responsive layouts, a product landing page, and client-side form validation.</p></Card><Card title="React Blog UI" badge="React + JSON"><p>A searchable blog with category filters and cards rendered from JSON data.</p></Card></div></section>
    <section className="section tint" id="contact"><div className="section-heading"><p className="eyebrow">CONTACT</p><h2>Let's connect</h2><p>This demo validates your form in the browser; it does not send data to a server.</p></div><Form /></section>
  </>;
}

function ComponentPractice() {
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState('React');
  const topics = ['HTML','CSS','JavaScript','React'];
  return <section className="section page-section">
    <div className="section-heading"><p className="eyebrow">ASSIGNMENT 2</p><h1>React Components Practice</h1><p>Five reusable components are used throughout this project: Header, Footer, Card, Button, and Form.</p></div>
    <div className="two-column"><Card title="Props example" badge="Props"><p>This card receives its title, badge, and content through props. Reuse the same Card component with different values.</p><p className="code-chip">&lt;Card title="Props example" badge="Props" /&gt;</p></Card>
    <Card title="State example" badge="useState"><p>Click the button to update the counter. React re-renders the component when state changes.</p><div className="counter"><strong>{count}</strong><div className="button-row"><Button onClick={() => setCount(count - 1)} variant="secondary">−</Button><Button onClick={() => setCount(count + 1)}>Add one</Button><Button onClick={() => setCount(0)} variant="ghost">Reset</Button></div></div></Card></div>
    <div className="demo-box"><h2>Dynamic rendering</h2><p>Select a topic to update the message using state.</p><div className="button-row wrap">{topics.map(topic=><Button key={topic} variant={selected===topic?'primary':'secondary'} onClick={()=>setSelected(topic)}>{topic}</Button>)}</div><div className="dynamic-message"><span className="badge">Selected topic</span><h3>{selected}</h3><p>{({HTML:'HTML defines the structure of a web page.',CSS:'CSS controls the visual design and responsive layout.',JavaScript:'JavaScript adds behaviour and interactivity.',React:'React builds interfaces from reusable components.'})[selected]}</p></div></div>
  </section>;
}

function Blog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const categories = ['All', ...new Set(posts.map(post => post.category))];
  const filteredPosts = useMemo(() => posts.filter(post => {
    const matchesCategory = category === 'All' || post.category === category;
    const searchText = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
    return matchesCategory && searchText.includes(query.toLowerCase().trim());
  }), [query, category]);
  return <section className="section page-section">
    <div className="section-heading"><p className="eyebrow">MINI PROJECT</p><h1>React Blog UI</h1><p>Blog cards are rendered from <code>src/data/posts.json</code>. Search by text or filter by category.</p></div>
    <div className="blog-controls"><label className="search-label">Search posts<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try “CSS” or “React”..." /></label><label className="filter-label">Category<select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(item=><option key={item}>{item}</option>)}</select></label></div>
    <p className="results-count">Showing {filteredPosts.length} of {posts.length} posts</p>
    {filteredPosts.length ? <div className="three-column blog-grid">{filteredPosts.map(post=><Card key={post.id} title={post.title} category={post.category}><p className="post-date">{new Date(`${post.date}T12:00:00`).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</p><p>{post.excerpt}</p><span className="read-more">Week 1 learning note ↗</span></Card>)}</div> : <div className="empty-state"><h3>No posts found</h3><p>Try a different search term or select All categories.</p><Button onClick={()=>{setQuery('');setCategory('All')}}>Clear filters</Button></div>}
  </section>;
}

export default function App() {
  const [activePage, setActivePage] = useState('portfolio');
  return <div id="top"><Header activePage={activePage} onNavigate={setActivePage}/><main>{activePage==='portfolio'?<Portfolio/>:activePage==='components'?<ComponentPractice/>:<Blog/>}</main><Footer/></div>;
}
