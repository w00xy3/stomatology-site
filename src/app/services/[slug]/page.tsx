import Link from "next/link";
import { services, getServiceBySlug } from "@/data/services";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { ChevronRight } from "@/components/icons";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return (
      <div className="pt-32 pb-20 text-center">
        <div className="container-custom">
          <h1 className="text-3xl font-bold text-text-primary mb-4">Услуга не найдена</h1>
          <Button href="/services" variant="primary">К списку услуг</Button>
        </div>
      </div>
    );
  }

  // Get related services (exclude current)
  const relatedServices = services
    .filter((s) => s.slug !== slug)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white transition-colors">Услуги</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{service.title}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {service.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Description */}
            <ScrollReveal>
              <p className="text-lg text-text-secondary leading-relaxed mb-10">
                {service.description}
              </p>
            </ScrollReveal>

            {/* Sub-services */}
            <h2 className="text-2xl font-bold text-text-primary mb-6">Процедуры и цены</h2>
            <div className="space-y-4 mb-12">
              {service.subServices.map((sub, i) => (
                <ScrollReveal key={sub.slug} delay={i * 0.05}>
                  <div className="bg-white rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-text-primary mb-1">{sub.title}</h3>
                        <p className="text-sm text-text-secondary">{sub.description}</p>
                      </div>
                      {sub.priceRange && (
                        <span className="text-sm font-medium text-primary whitespace-nowrap">
                          {sub.priceRange}
                        </span>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mb-16">
              <Button href="/contacts#booking" variant="accent" size="lg">
                Записаться на эту услугу
              </Button>
            </div>

            {/* Related Services */}
            {relatedServices.length > 0 && (
              <>
                <h2 className="text-2xl font-bold text-text-primary mb-6">Связанные услуги</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedServices.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="bg-white rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow"
                    >
                      <h3 className="font-semibold text-text-primary text-sm mb-1">{s.title}</h3>
                      <p className="text-xs text-text-secondary line-clamp-2">{s.description}</p>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
