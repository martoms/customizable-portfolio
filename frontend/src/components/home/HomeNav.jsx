import { useEffect } from "react";

const HomeNav = () => {

    useEffect(() => {
        const navItems = document.querySelectorAll('.nav-scroll-item');

        const navItemAction = (entries) => {
            entries.forEach(entry => {
                const ratio = entry.intersectionRatio;
                entry.target.style.opacity = `${ratio}`;
                entry.target.style.transform = `scale(${0.5 + ratio * 0.5})`;
            });
        };

        const observer = new IntersectionObserver(navItemAction, {
            rootMargin: '-70px',
            threshold: Array.from({ length: 101 }, (_, index) => index / 100)
        });

        navItems.forEach(item => {
            observer.observe(item);
        });

        return () => {
            navItems.forEach(item => {
                observer.unobserve(item);
            });
            observer.disconnect();
        };
    }, []);

    return (
        <div className="row homenav">
            <div className="col homenav-col">
                <ul>
                    <li className="nav-scroll-item" style={{ opacity: 0 }}>Portfolio</li>
                    <li className="nav-scroll-item" style={{ opacity: 0 }}>Profile</li>
                    <li className="nav-scroll-item" style={{ opacity: 0 }}>Contact</li>
                </ul>
            </div>
        </div>
    );
}

export default HomeNav;
