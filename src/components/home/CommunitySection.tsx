import { useRef } from 'react';

export default function CommunitySection() {
    const containerRef = useRef<HTMLElement>(null);

    return (
        <section className="community-section" ref={containerRef}>
            <div className="community-split-layout">
                {/* Sticky Left Column */}
                <div className="community-content">
                    <div className="community-pill">★ COMMUNITY</div>
                    <h2 className="community-heading">WE BELIEVE IN THE POWER OF PEERS.</h2>
                    <p className="community-subtext">
                        The real change doesn't happen in boardrooms. It happens on the ground, led by individuals who refuse to accept the status quo. Read stories from our network of grassroots leaders.
                    </p>
                    <button className="btn btn-primary btn-magnetic" style={{ background: '#1A3626', color: '#FFF' }}>Read More Stories</button>
                </div>

                {/* Right Column: Marquee Grid */}
                <div className="community-marquee-wrapper">
                    {/* Column 1: UP */}
                    <div className="marquee-col marquee-up">
                        <div className="marquee-track">
                            <div className="marquee-content">
                                <TestimonialCard 
                                    name="Arjun M." 
                                    role="COMMUNITY LEADER" 
                                    text="Pilag Foundation gave us the tools to map our ancestral lands when the government said they didn't exist. Now, our forest is legally protected." 
                                />
                                <TestimonialCard 
                                    name="Sarah K." 
                                    role="ENVIRONMENTAL LAWYER" 
                                    text="The litigation fund allowed us to take on massive fossil fuel corporations and win. This isn't just charity, it's systemic defense." 
                                />
                                <TestimonialCard 
                                    name="Ravi P." 
                                    role="VOLUNTEER" 
                                    text="I started by planting trees. Now I lead digital literacy workshops for tribal youth. The ripple effect of this community is astounding." 
                                />
                            </div>
                            {/* Duplicate for seamless looping */}
                            <div className="marquee-content">
                                <TestimonialCard 
                                    name="Arjun M." 
                                    role="COMMUNITY LEADER" 
                                    text="Pilag Foundation gave us the tools to map our ancestral lands when the government said they didn't exist. Now, our forest is legally protected." 
                                />
                                <TestimonialCard 
                                    name="Sarah K." 
                                    role="ENVIRONMENTAL LAWYER" 
                                    text="The litigation fund allowed us to take on massive fossil fuel corporations and win. This isn't just charity, it's systemic defense." 
                                />
                                <TestimonialCard 
                                    name="Ravi P." 
                                    role="VOLUNTEER" 
                                    text="I started by planting trees. Now I lead digital literacy workshops for tribal youth. The ripple effect of this community is astounding." 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Column 2: DOWN */}
                    <div className="marquee-col marquee-down">
                        <div className="marquee-track">
                            <div className="marquee-content">
                                <TestimonialCard 
                                    name="Elena D." 
                                    role="STUDENT ACTIVIST" 
                                    text="The grassroots network is incredible. I've met so many passionate individuals fighting for climate justice. It gives me hope for the future." 
                                />
                                <TestimonialCard 
                                    name="Marcus T." 
                                    role="DATA SCIENTIST" 
                                    text="Using satellite data to prove illegal logging has been the most fulfilling work of my life. The impact is immediate and undeniable." 
                                />
                                <TestimonialCard 
                                    name="Priya N." 
                                    role="LOCAL FARMER" 
                                    text="Before the foundation intervened, our water supply was polluted. Now, we have clean water and sustainable farming practices." 
                                />
                            </div>
                            {/* Duplicate for seamless looping */}
                            <div className="marquee-content">
                                <TestimonialCard 
                                    name="Elena D." 
                                    role="STUDENT ACTIVIST" 
                                    text="The grassroots network is incredible. I've met so many passionate individuals fighting for climate justice. It gives me hope for the future." 
                                />
                                <TestimonialCard 
                                    name="Marcus T." 
                                    role="DATA SCIENTIST" 
                                    text="Using satellite data to prove illegal logging has been the most fulfilling work of my life. The impact is immediate and undeniable." 
                                />
                                <TestimonialCard 
                                    name="Priya N." 
                                    role="LOCAL FARMER" 
                                    text="Before the foundation intervened, our water supply was polluted. Now, we have clean water and sustainable farming practices." 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Column 3: UP (Staggered) */}
                    <div className="marquee-col marquee-up" style={{ animationDelay: '-15s' }}>
                        <div className="marquee-track">
                            <div className="marquee-content">
                                <TestimonialCard 
                                    name="David L." 
                                    role="PHILANTHROPIST" 
                                    text="I've seen many organizations, but Pilag's commitment to direct project funding is unparalleled. I know exactly where my money goes." 
                                />
                                <TestimonialCard 
                                    name="Aisha M." 
                                    role="CLIMATE RESEARCHER" 
                                    text="The data collected by the community is invaluable for our climate models. It bridges the gap between global trends and local realities." 
                                />
                                <TestimonialCard 
                                    name="Tom H." 
                                    role="WILDLIFE PHOTOGRAPHER" 
                                    text="Documenting the recovery of these ecosystems has been breathtaking. The return of native species is a testament to their hard work." 
                                />
                            </div>
                            {/* Duplicate for seamless looping */}
                            <div className="marquee-content">
                                <TestimonialCard 
                                    name="David L." 
                                    role="PHILANTHROPIST" 
                                    text="I've seen many organizations, but Pilag's commitment to direct project funding is unparalleled. I know exactly where my money goes." 
                                />
                                <TestimonialCard 
                                    name="Aisha M." 
                                    role="CLIMATE RESEARCHER" 
                                    text="The data collected by the community is invaluable for our climate models. It bridges the gap between global trends and local realities." 
                                />
                                <TestimonialCard 
                                    name="Tom H." 
                                    role="WILDLIFE PHOTOGRAPHER" 
                                    text="Documenting the recovery of these ecosystems has been breathtaking. The return of native species is a testament to their hard work." 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function TestimonialCard({ name, role, text }: { name: string, role: string, text: string }) {
    return (
        <div className="testimonial-card">
            <div className="testimonial-quote-icon"></div>
            <p className="testimonial-text">"{text}"</p>
            <div className="testimonial-author">
                <div>
                    <div className="testimonial-name">{name}</div>
                    <div className="testimonial-role">{role}</div>
                </div>
                <div className="testimonial-stars">★★★★★</div>
            </div>
        </div>
    );
}
