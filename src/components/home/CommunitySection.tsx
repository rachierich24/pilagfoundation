"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface Testimonial {
    id: string;
    name: string;
    role: string;
    text: string;
    initial: string;
    verifiedLocation?: string;
}

const column1Data: Testimonial[] = [
    {
        id: 'c1-1',
        name: 'Arjun M.',
        role: 'INDIGENOUS COMMUNITY LEADER',
        text: 'PILAG Foundation provided us with GPS mapping tools and legal aid to defend our ancestral forests when commercial loggers arrived.',
        initial: 'A',
        verifiedLocation: 'Land Rights'
    },
    {
        id: 'c1-2',
        name: 'Priya S.',
        role: 'ENVIRONMENTAL RESEARCHER',
        text: 'The open environmental database allowed our team to document 40+ endangered species across protected forest reserves.',
        initial: 'P',
        verifiedLocation: 'Forest Mapping'
    },
    {
        id: 'c1-3',
        name: 'Rahul M.',
        role: 'CIVIC ACTION VOLUNTEER',
        text: 'Organizing clean-up and reforestation drives used to take months. With PILAG\'s local network, 200+ volunteers mobilize in hours.',
        initial: 'R',
        verifiedLocation: 'Local Action'
    },
    {
        id: 'c1-4',
        name: 'Ananya D.',
        role: 'POLICY & GOVERNANCE FELLOW',
        text: 'PILAG\'s grassroots governance training helped our village council draft transparent community budget proposals.',
        initial: 'A',
        verifiedLocation: 'Civic Governance'
    }
];

const column2Data: Testimonial[] = [
    {
        id: 'c2-1',
        name: 'Aditya N.',
        role: 'ENVIRONMENTAL LAWYER',
        text: 'The litigation fund gave us the resources to take on illegal mining operations in court and secure binding conservation orders.',
        initial: 'A',
        verifiedLocation: 'Legal Aid'
    },
    {
        id: 'c2-2',
        name: 'Sneha G.',
        role: 'YOUTH COMMUNITY COORDINATOR',
        text: 'Empowering young people with civic literacy tools turned passive observers into active defenders of local watersheds.',
        initial: 'S',
        verifiedLocation: 'Youth Action'
    },
    {
        id: 'c2-3',
        name: 'Neha P.',
        role: 'GEOSPATIAL DATA ANALYST',
        text: 'Using satellite telemetry and field sensors, PILAG’s open platform alerts local rangers to deforestation spikes in real time.',
        initial: 'N',
        verifiedLocation: 'Tech for Good'
    },
    {
        id: 'c2-4',
        name: 'Karthik V.',
        role: 'SUSTAINABLE AGRI ADVOCATE',
        text: 'Swapping native seed stocks and sustainable farming methods through PILAG\'s network helped 50+ farming families double crop resilience.',
        initial: 'K',
        verifiedLocation: 'Local Resilience'
    }
];

const column3Data: Testimonial[] = [
    {
        id: 'c3-1',
        name: 'Sarah K.',
        role: 'CONSERVATION BIOLOGIST',
        text: 'Working directly with indigenous elders to document traditional ecological knowledge has transformed our conservation strategy.',
        initial: 'S',
        verifiedLocation: 'Traditional Knowledge'
    },
    {
        id: 'c3-2',
        name: 'Simran K.',
        role: 'GRASSROOTS JOURNALIST',
        text: 'PILAG gives frontline communities a microphone. Our investigative stories on river pollution led to real municipal reform.',
        initial: 'S',
        verifiedLocation: 'Civic Voice'
    },
    {
        id: 'c3-3',
        name: 'Aman S.',
        role: 'CLEAN WATER ADVOCATE',
        text: 'Installing solar filtration units with PILAG brought clean drinking water to over 1,200 households across remote villages.',
        initial: 'A',
        verifiedLocation: 'Clean Water Drive'
    },
    {
        id: 'c3-4',
        name: 'Pooja M.',
        role: 'CLIMATE FINANCE FELLOW',
        text: 'Direct micro-grants to indigenous stewards ensure every dollar donated goes directly into verified forest protection.',
        initial: 'P',
        verifiedLocation: 'Transparent Fund'
    }
];

export default function CommunitySection() {
    const containerRef = useRef<HTMLElement>(null);

    return (
        <section className="peer-community-section" ref={containerRef}>
            {/* Background Ambient Glow */}
            <div className="peer-bg-glow"></div>

            <div className="peer-split-layout">
                {/* Left Column (Content) */}
                <div className="peer-left-content">
                    <div className="peer-badge">
                        <span className="peer-badge-dot"></span>
                        LOCAL GOVERNANCE & IMPACT
                    </div>

                    <h2 className="peer-heading">
                        WE BELIEVE IN THE<br />
                        <span className="peer-heading-highlight">POWER OF PEOPLE.</span>
                    </h2>

                    <p className="peer-subtext">
                        PILAG Foundation empowers frontline communities, protects ancestral lands, and builds transparent local governance through grassroots civic action.
                    </p>

                    <Link href="/impact" className="peer-cta-btn">
                        <span>EXPLORE OUR IMPACT</span>
                        <div className="cta-arrow-circle">
                            <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                    </Link>
                </div>

                {/* Right Column: 3 Responsive Marquee Columns */}
                <div className="peer-marquee-wrapper">
                    {/* Column 1: Moves UP */}
                    <div className="peer-marquee-col peer-marquee-up">
                        <div className="peer-marquee-track">
                            <div className="peer-marquee-content">
                                {column1Data.map((item) => (
                                    <PeerTestimonialCard key={item.id} data={item} />
                                ))}
                            </div>
                            <div className="peer-marquee-content">
                                {column1Data.map((item) => (
                                    <PeerTestimonialCard key={`dup-${item.id}`} data={item} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Moves DOWN */}
                    <div className="peer-marquee-col peer-marquee-down">
                        <div className="peer-marquee-track">
                            <div className="peer-marquee-content">
                                {column2Data.map((item) => (
                                    <PeerTestimonialCard key={item.id} data={item} />
                                ))}
                            </div>
                            <div className="peer-marquee-content">
                                {column2Data.map((item) => (
                                    <PeerTestimonialCard key={`dup-${item.id}`} data={item} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Moves UP */}
                    <div className="peer-marquee-col peer-marquee-up" style={{ animationDelay: '-10s' }}>
                        <div className="peer-marquee-track">
                            <div className="peer-marquee-content">
                                {column3Data.map((item) => (
                                    <PeerTestimonialCard key={item.id} data={item} />
                                ))}
                            </div>
                            <div className="peer-marquee-content">
                                {column3Data.map((item) => (
                                    <PeerTestimonialCard key={`dup-${item.id}`} data={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function PeerTestimonialCard({ data }: { data: Testimonial }) {
    return (
        <div className="peer-card">
            <div className="peer-card-top">
                <div className="peer-avatar">{data.initial}</div>
                <div className="peer-verified-tag">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                    <span>{data.verifiedLocation || 'Verified'}</span>
                </div>
            </div>

            <p className="peer-quote-text">"{data.text}"</p>

            <div className="peer-card-bottom">
                <div className="peer-author-info">
                    <div className="peer-author-name">{data.name}</div>
                    <div className="peer-author-role">{data.role}</div>
                </div>
            </div>
        </div>
    );
}
