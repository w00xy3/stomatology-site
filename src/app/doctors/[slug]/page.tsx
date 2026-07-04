import Link from "next/link";
import Image from "next/image";
import { getDoctorBySlug, doctors } from "@/data/doctors";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import { ChevronRight, Award, Calendar } from "@/components/icons";

export function generateStaticParams() {
  return doctors.map((doctor) => ({
    slug: doctor.slug,
  }));
}

export default async function DoctorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);

  if (!doctor) {
    return (
      <div className="pt-32 pb-20 text-center">
        <div className="container-custom">
          <h1 className="text-3xl font-bold text-text-primary mb-4">Врач не найден</h1>
          <Button href="/doctors" variant="primary">К списку врачей</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/doctors" className="hover:text-white transition-colors">Врачи</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{doctor.name}</span>
          </nav>
        </div>
      </section>

      {/* Profile */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {/* Photo */}
            <ScrollReveal direction="left">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src={doctor.photo}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
              </div>
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal direction="right" delay={0.2} className="lg:col-span-2">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
                  {doctor.name}
                </h1>
                <p className="text-lg text-primary font-medium mb-6">
                  {doctor.specialization}
                </p>

                {doctor.experience !== undefined && (
                  <div className="flex items-center gap-2 text-text-secondary mb-4">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>
                      Стаж работы: {doctor.experience}{" "}
                      {doctor.experience === 1
                        ? "год"
                        : doctor.experience < 5
                        ? "года"
                        : "лет"}
                    </span>
                  </div>
                )}

                {doctor.bio && (
                  <p className="text-text-secondary leading-relaxed mb-6">
                    {doctor.bio}
                  </p>
                )}

                {doctor.directions && doctor.directions.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      Направления работы
                    </h3>
                    <ul className="space-y-2">
                      {doctor.directions.map((dir) => (
                        <li key={dir} className="flex items-center gap-2 text-text-secondary">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {dir}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button href="/contacts#booking" variant="accent" size="lg">
                  Записаться к врачу
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
