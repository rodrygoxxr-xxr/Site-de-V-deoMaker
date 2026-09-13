import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Play, ArrowRight, Instagram, MessageCircle, Star, Quote } from "lucide-react";
import anaKarolineAsset from "@/assets/ana-karoline.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("todos");
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const whatsappNumber = "5573998178824";
  const whatsappMessage = encodeURIComponent("Olá, Ana! Conheci seu trabalho pelo site e gostaria de solicitar um orçamento.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const instagramUrl = "https://www.instagram.com/anakfilms_";
  const instagramFloatingIconUrl = "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png";

  const navItems = [
    { label: "Início", id: "hero" },
    { label: "Sobre", id: "sobre" },
    { label: "Serviços", id: "servicos" },
    { label: "Portfólio", id: "portfolio" },
    { label: "Contato", id: "contato" },
  ];

  const services = [
    {
      title: "Eventos",
      description: "Registro momentos especiais com um olhar atento aos detalhes, emoções e acontecimentos que tornam cada evento único.",
    },
    {
      title: "Empresas",
      description: "Conteúdo audiovisual pensado para fortalecer a presença da sua marca e aproximar sua empresa do público.",
    },
    {
      title: "Pré-Wedding",
      description: "Vídeos românticos e autênticos para transformar a história de cada casal em uma experiência visual inesquecível.",
    },
    {
      title: "StoryMaker",
      description: "Cobertura e criação de Stories para registrar acontecimentos em tempo real e manter sua audiência conectada ao momento.",
    },
  ];

  const portfolioItems = [
    { id: 1, category: "eventos", title: "Casamento Marina & Rafael", description: "Registro completo do grande dia" },
    { id: 2, category: "empresas", title: "Branding Hotel Vista", description: "Vídeo institucional para redes" },
    { id: 3, category: "pre-wedding", title: "Lua de Mel no Algarve", description: "Pré-wedding em Portugal" },
    { id: 4, category: "stories", title: "Festival Gourmet 2025", description: "Cobertura em tempo real" },
    { id: 5, category: "eventos", title: "Aniversário 30 Anos", description: "Celebração íntima" },
    { id: 6, category: "empresas", title: "Lançamento Produto Tech", description: "Campanha digital" },
  ];

  const filteredPortfolio = activeFilter === "todos"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  const differentials = ["Olhar", "Sensibilidade", "Narrativa", "Detalhes", "Emoção", "Experiência"];

  const processSteps = [
    { number: "01", title: "Conversa", description: "Entender o evento, projeto ou necessidade da marca." },
    { number: "02", title: "Planejamento", description: "Definir detalhes, referências e o que será registrado." },
    { number: "03", title: "Produção", description: "Captar os momentos com um olhar criativo e estratégico." },
    { number: "04", title: "Entrega", description: "Transformar os registros em vídeos que contam a história." },
  ];

  const testimonials = [
    { id: 1, text: "Placeholder: depoimento real da cliente — substituir por texto autêntico.", author: "Nome da Cliente" },
    { id: 2, text: "Placeholder: depoimento real do cliente — substituir por texto autêntico.", author: "Nome do Cliente" },
    { id: 3, text: "Placeholder: depoimento real do casal — substituir por texto autêntico.", author: "Nome do Casal" },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const sectionClass = (id: string) => `
    transition-all duration-700 ease-out
    ${visibleSections.has(id) || prefersReducedMotion ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
  `;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#faf9f7] overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1a1a1a]" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <button
              type="button"
              onClick={() => scrollToSection("hero")}
              className="flex flex-col items-start text-left bg-transparent border-0 p-0 m-0 cursor-pointer"
              aria-label="Voltar ao topo do site"
            >
              <span className="text-sm tracking-[0.3em] font-medium text-[#faf9f7]">ANA KAROLINE</span>
              <span className="text-[10px] tracking-[0.2em] text-[#888] mt-0.5">VIDEOMAKER MOBILE & STORYMAKER</span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-xs tracking-[0.15em] text-[#ccc] hover:text-[#faf9f7] transition-all duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#faf9f7] transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-scale px-5 py-2 text-xs tracking-[0.1em] border border-[#333] text-[#faf9f7] hover:bg-[#faf9f7] hover:text-[#0a0a0a] hover:border-[#faf9f7]"
              >
                Solicitar orçamento
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Overlay */}
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setMobileMenuOpen(false)}
          className={`lg:hidden fixed inset-0 z-[55] bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        />

        {/* Mobile Menu Drawer */}
        <div
          className={`lg:hidden fixed top-0 right-0 bottom-0 z-[60] w-[min(85vw,360px)] bg-[#0a0a0a] border-l border-[#1a1a1a] shadow-2xl transform transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-hidden={!mobileMenuOpen}
        >
          <nav className="flex h-full flex-col p-6 pt-24 gap-6 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm tracking-[0.15em] text-[#ccc] hover:text-[#faf9f7] transition-colors text-left"
              >
                {item.label}
              </button>
            ))}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-5 py-3 text-xs tracking-[0.1em] border border-[#333] text-[#faf9f7] hover:bg-[#faf9f7] hover:text-[#0a0a0a] transition-all text-center"
            >
              Solicitar orçamento
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/40 to-[#0a0a0a]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-[#111] flex items-center justify-center">
            <span className="text-[#333] text-sm tracking-[0.3em]">VIDEO PLACEHOLDER</span>
          </div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="mb-8 animate-fadeIn">
            <span className="text-xs tracking-[0.4em] text-[#888] block mb-3">VIDEOMAKER MOBILE & STORYMAKER</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ana Karoline
            </h1>
          </div>
          <p
            className="text-xl md:text-2xl lg:text-3xl text-[#faf9f7] mb-6 leading-relaxed animate-fadeIn"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
          >
            Vídeos que eternizam momentos e fortalecem marcas.
          </p>
          <p className="text-sm text-[#888] mb-12 max-w-lg mx-auto leading-relaxed animate-fadeIn">
            Histórias reais, momentos únicos e conteúdos que merecem ser lembrados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn">
            <button
              onClick={() => scrollToSection("portfolio")}
              className="btn-scale px-8 py-4 text-xs tracking-[0.15em] bg-[#faf9f7] text-[#0a0a0a] hover:bg-[#e0e0e0]"
            >
              Ver portfólio
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-scale px-8 py-4 text-xs tracking-[0.15em] border border-[#faf9f7] text-[#faf9f7] hover:bg-[#faf9f7] hover:text-[#0a0a0a]"
            >
              Solicitar orçamento
            </a>
          </div>
        </div>
        <button
          onClick={() => scrollToSection("sobre")}
          className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 text-[#666] hover:text-[#faf9f7] transition-colors cursor-pointer"
          aria-label="Rolar para a seção Sobre"
        >
          <ChevronDown size={20} />
        </button>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-32 px-6 lg:px-12">
        <div className={`max-w-6xl mx-auto ${sectionClass("sobre")}`}>
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <span className="text-[10px] tracking-[0.3em] text-[#666] block mb-6">SOBRE</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>
                Por trás de cada vídeo, existe uma história.
              </h2>
              <p className="text-[#aaa] text-base leading-relaxed max-w-xl">
                Meu trabalho é transformar momentos, experiências e ideias em vídeos que despertam sentimentos e permanecem na memória. Seja registrando um momento especial ou criando conteúdo para uma marca, cada produção é pensada para contar uma história de forma autêntica e visualmente marcante.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                {["Eventos", "Empresas", "Pré-Wedding", "Stories"].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-[10px] tracking-[0.15em] border border-[#333] text-[#888] transition-all duration-300 hover:border-[#666] hover:text-[#aaa]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="aspect-[3/4] bg-[#111] overflow-hidden border border-[#1a1a1a] card-hover">
                <img src={anaKarolineAsset.url} alt="Ana Karoline, social media e videomaker mobile, segurando um celular" loading="lazy" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-32 px-6 lg:px-12 bg-[#080808]">
        <div className={`max-w-6xl mx-auto ${sectionClass("servicos")}`}>
          <div className="text-center mb-20">
            <span className="text-[10px] tracking-[0.3em] text-[#666] block mb-6">SERVIÇOS</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>O que eu faço</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-[#1a1a1a]">
            {services.map((service, index) => (
              <div key={index} className="service-card bg-[#080808] p-10 lg:p-14 group cursor-pointer">
                <span className="text-[10px] tracking-[0.3em] text-[#444] block mb-6 group-hover:text-[#666] transition-colors duration-300">0{index + 1}</span>
                <h3 className="text-2xl lg:text-3xl mb-6 group-hover:translate-x-2 transition-transform duration-300" style={{ fontFamily: "'Playfair Display', serif" }}>{service.title}</h3>
                <p className="text-[#777] text-sm leading-relaxed group-hover:text-[#999] transition-colors duration-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 px-6 lg:px-12">
        <div className={`max-w-7xl mx-auto ${sectionClass("portfolio")}`}>
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.3em] text-[#666] block mb-6">PORTFÓLIO</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Histórias em movimento.</h2>
            <p className="text-[#666] text-sm">Cada projeto tem seu próprio ritmo, identidade e emoção.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[{ id: "todos", label: "Todos" }, { id: "eventos", label: "Eventos" }, { id: "empresas", label: "Empresas" }, { id: "pre-wedding", label: "Pré-Wedding" }, { id: "stories", label: "Stories" }].map((filter) => (
              <button key={filter.id} onClick={() => setActiveFilter(filter.id)} className={`btn-scale px-4 py-2 text-xs tracking-[0.1em] transition-all duration-300 ${activeFilter === filter.id ? "bg-[#faf9f7] text-[#0a0a0a]" : "border border-[#333] text-[#888] hover:border-[#555] hover:text-[#aaa]"}`}>
                {filter.label}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPortfolio.map((item, idx) => (
              <div key={item.id} className="portfolio-item group relative aspect-[9/16] bg-[#111] cursor-pointer overflow-hidden" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="absolute inset-0 bg-[#0a0a0a]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-14 h-14 rounded-full border border-[#faf9f7] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"><Play size={18} fill="#faf9f7" /></div>
                    <h4 className="text-sm mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h4>
                    <span className="text-[10px] tracking-[0.15em] text-[#888] uppercase">{item.category}</span>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center"><span className="text-[#333] text-[10px] tracking-[0.2em]">VIDEO PLACEHOLDER</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differential Section */}
      <section className="py-32 px-6 lg:px-12 bg-[#080808]">
        <div className={`max-w-5xl mx-auto text-center ${sectionClass("differential")}`}>
          <span className="text-[10px] tracking-[0.3em] text-[#666] block mb-6">DIFERENCIAL</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-20" style={{ fontFamily: "'Playfair Display', serif" }}>Mais do que registrar. Contar histórias.</h2>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
            {differentials.map((word, index) => <span key={index} className="text-2xl md:text-3xl text-[#444] hover:text-[#faf9f7] transition-colors duration-500" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>{word}</span>)}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="processo" className="py-32 px-6 lg:px-12">
        <div className={`max-w-6xl mx-auto ${sectionClass("processo")}`}>
          <div className="text-center mb-20">
            <span className="text-[10px] tracking-[0.3em] text-[#666] block mb-6">PROCESSO</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>Do primeiro contato ao vídeo final.</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-[#1a1a1a]" />
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative group">
                <div className="w-8 h-8 bg-[#0a0a0a] border border-[#333] rounded-full mx-auto mb-8 relative z-10 flex items-center justify-center transition-all duration-300 group-hover:border-[#faf9f7] group-hover:bg-[#1a1a1a]"><span className="text-[10px] text-[#666] transition-colors duration-300 group-hover:text-[#faf9f7]">{step.number}</span></div>
                <h3 className="text-lg mb-4 transition-colors duration-300 group-hover:text-[#faf9f7]" style={{ fontFamily: "'Playfair Display', serif" }}>{step.title}</h3>
                <p className="text-[#666] text-sm leading-relaxed transition-colors duration-300 group-hover:text-[#888]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6 lg:px-12 bg-[#080808]">
        <div className={`max-w-3xl mx-auto text-center ${sectionClass("depoimentos")}`}>
          <span className="text-[10px] tracking-[0.3em] text-[#666] block mb-6">DEPOIMENTOS</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>Experiências que ficam.</h2>
          <div className="relative min-h-[200px]">
            <Quote className="w-8 h-8 text-[#222] mx-auto mb-8" />
            <p key={activeTestimonial} className="text-xl md:text-2xl leading-relaxed mb-8 animate-fadeIn" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>{testimonials[activeTestimonial]?.text}</p>
            <p className="text-[#666] text-sm tracking-[0.1em]">— {testimonials[activeTestimonial]?.author}</p>
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => <button key={index} onClick={() => setActiveTestimonial(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeTestimonial ? "bg-[#faf9f7]" : "bg-[#333]"}`} aria-label={`Ver depoimento ${index + 1}`} />)}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 lg:px-12">
        <div className={`max-w-3xl mx-auto text-center ${sectionClass("cta")}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Vamos transformar seu momento em história?</h2>
          <p className="text-[#888] mb-12 max-w-lg mx-auto">Conte um pouco sobre seu projeto, evento ou ideia. Vamos conversar.</p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-scale inline-flex items-center gap-3 px-10 py-5 bg-[#faf9f7] text-[#0a0a0a] text-xs tracking-[0.15em] hover:bg-[#e0e0e0] group"><MessageCircle size={18} />Solicitar orçamento pelo WhatsApp<ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" /></a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-32 px-6 lg:px-12 bg-[#080808]">
        <div className={`max-w-4xl mx-auto ${sectionClass("contato")}`}>
          <div className="text-center mb-16"><span className="text-[10px] tracking-[0.3em] text-[#666] block mb-6">CONTATO</span><h2 className="text-3xl md:text-4xl lg:text-5xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Entre em contato</h2></div>
          <div className="text-center">
            <h3 className="text-lg mb-2">Ana Karoline</h3><p className="text-[#666] text-sm mb-6">Videomaker Mobile & StoryMaker</p><p className="text-[10px] tracking-[0.3em] text-[#444] mb-10">EVENTOS • EMPRESAS • PRÉ-WEDDING</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-scale inline-flex items-center gap-2 px-6 py-3 border border-[#333] text-[#faf9f7] hover:bg-[#faf9f7] hover:text-[#0a0a0a] hover:border-[#faf9f7]"><MessageCircle size={16} />WhatsApp</a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-scale inline-flex items-center gap-2 px-6 py-3 border border-[#333] text-[#faf9f7] hover:bg-[#faf9f7] hover:text-[#0a0a0a] hover:border-[#faf9f7]"><Instagram size={16} />@anakfilms_</a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Instagram Button */}
      <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="whatsapp-bounce fixed bottom-24 right-8 z-50 w-14 h-14 rounded-[18px] overflow-hidden flex items-center justify-center shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105" aria-label="Abrir Instagram @anakfilms_">
        <img src={instagramFloatingIconUrl} alt="Instagram" className="w-full h-full object-cover" loading="eager" />
      </a>

      {/* Floating WhatsApp Button */}
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="whatsapp-bounce fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl" aria-label="Contato via WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371.372-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      {/* Footer */}
      <footer className="py-16 px-6 lg:px-12 border-t border-[#111]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="text-center lg:text-left">
              <span className="text-sm tracking-[0.3em] block mb-1">ANA KAROLINE</span>
              <span className="text-[10px] tracking-[0.15em] text-[#444] block mb-3">VIDEOMAKER MOBILE & STORYMAKER</span>
              <p className="text-sm text-[#666] italic" style={{ fontFamily: "'Playfair Display', serif" }}>Vídeos que eternizam momentos e fortalecem marcas.</p>
            </div>
            <nav className="flex flex-wrap justify-center gap-8">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-xs tracking-[0.1em] text-[#666] hover:text-[#faf9f7] transition-all duration-300 relative group">Instagram<span className="absolute -bottom-1 left-0 w-0 h-px bg-[#faf9f7] transition-all duration-300 group-hover:w-full"></span></a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-xs tracking-[0.1em] text-[#666] hover:text-[#faf9f7] transition-all duration-300 relative group">WhatsApp<span className="absolute -bottom-1 left-0 w-0 h-px bg-[#faf9f7] transition-all duration-300 group-hover:w-full"></span></a>
              <button onClick={() => scrollToSection("portfolio")} className="text-xs tracking-[0.1em] text-[#666] hover:text-[#faf9f7] transition-all duration-300 relative group">Portfólio<span className="absolute -bottom-1 left-0 w-0 h-px bg-[#faf9f7] transition-all duration-300 group-hover:w-full"></span></button>
              <button onClick={() => scrollToSection("contato")} className="text-xs tracking-[0.1em] text-[#666] hover:text-[#faf9f7] transition-all duration-300 relative group">Contato<span className="absolute -bottom-1 left-0 w-0 h-px bg-[#faf9f7] transition-all duration-300 group-hover:w-full"></span></button>
            </nav>
          </div>
          <div className="mt-12 pt-8 border-t border-[#111] text-center"><p className="text-[10px] tracking-[0.15em] text-[#333]">© 2026 Ana Karoline. Todos os direitos reservados.</p></div>
        </div>
      </footer>
    </div>
  );
}
