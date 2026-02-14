import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { performanceImages, performanceImgPositions } from "../constants/index.js";

gsap.registerPlugin(ScrollTrigger);

const Performance = () => {
    const sectionRef = useRef(null);

    useGSAP(() => {
        const section = sectionRef.current;
        const mm = gsap.matchMedia();

        // Text fade-in animation (runs on all screen sizes)
        const contentP = section.querySelector(".content p");
        gsap.fromTo(
            contentP,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: contentP,
                    start: "top 85%",
                    end: "top 50%",
                    toggleActions: "play none none reverse",
                    invalidateOnRefresh: true,
                },
            }
        );

        // Desktop-only: Image timeline animation
        mm.add("(min-width: 1025px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 50%",
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });

            // Animate each image to its final position (skip p5)
            performanceImgPositions.forEach((pos) => {
                if (pos.id === "p5") return; // Skip p5

                const imgEl = section.querySelector(`.${pos.id}`);
                if (!imgEl) return;

                const animProps = {
                    duration: 1,
                    ease: "power2.out",
                };

                if (pos.left !== undefined) {
                    animProps.left = `${pos.left}%`;
                }
                if (pos.right !== undefined) {
                    animProps.right = `${pos.right}%`;
                }
                if (pos.bottom !== undefined) {
                    animProps.bottom = `${pos.bottom}%`;
                }
                if (pos.transform !== undefined) {
                    animProps.transform = pos.transform;
                }

                // All animations start at time 0
                tl.to(imgEl, animProps, 0);
            });

            return () => {
                tl.kill();
            };
        });

        return () => {
            mm.revert();
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === section) st.kill();
            });
        };
    }, { scope: sectionRef });

    return (
        <section id="performance" ref={sectionRef}>
            <h2> Next Level graphics performance.game On.</h2>
            <div className="wrapper">
                {performanceImages.map(({ id, src }) => (
                    <img key={id} src={src} alt={id} className={id} />
                ))}
            </div>

            <div className="content">
                <p>
                    Run graphics-intensive workflows with a responsiveness that keeps up
                    with your imagination. The M4 family of chips features a GPU with a
                    second-generation hardware-accelerated ray tracing engine that renders
                    images faster, so{" "}
                    <span className="text-white">
                        gaming feels more immersive and realistic than ever.
                    </span>{" "}
                    And Dynamic Caching optimizes fast on-chip memory to dramatically
                    increase average GPU utilization — driving a huge performance boost
                    for the most demanding pro apps and games.
                </p>
            </div>
        </section>
    );
};

export default Performance;
