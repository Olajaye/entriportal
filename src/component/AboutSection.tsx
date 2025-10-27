const AboutSection = () => {
  return (
    <section className="content-section bg-section-background">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="section-title">About the Platform</h2>
          <p className="section-subtitle">
            NeuroBytes revolutionizes AI deployment through its modular
            architecture. Each "NeuroBytes" module is a specialized AI
            application designed for specific industries and use cases.
          </p>
          <div className="bg-pure-white rounded-2xl p-8 shadow-card">
            <p className="text-lg text-dark-gray leading-relaxed">
              Instead of building AI solutions from scratch, enterprises can
              integrate proven, industry-tested modules that deliver immediate
              value. Our platform ensures security, scalability, and seamless
              integration with existing systems, allowing businesses to adopt AI
              technology with confidence and speed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;