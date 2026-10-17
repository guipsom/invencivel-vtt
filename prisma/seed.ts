import { PrismaClient, EnhancementType, EntryType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o povoamento dos catálogos oficiais...');

  const powersData = [
    {
      name: 'Golpe',
      powerType: 'Ataque',
      description: 'Ataque corpo a corpo devastador reforçado por força sobre-humana ou energia.',
      baseDamage: 2,
      baseRange: 'Toque',
      enhancements: [
        { name: 'Golpe Perfurante', enhancementType: EnhancementType.MELHORIA, karmaCost: 20 },
        { name: 'Golpe Súbito', enhancementType: EnhancementType.MELHORIA, karmaCost: 20 },
        { name: 'Golpe Carregado', enhancementType: EnhancementType.LIMITE, karmaCost: 10 },
      ],
    },
    {
      name: 'Rajada',
      powerType: 'Ataque',
      description: 'Projéteis de energia, matéria ou força lançados à distância.',
      baseDamage: 2,
      baseRange: 'À Distância',
      enhancements: [
        { name: 'Efeito de Explosão', enhancementType: EnhancementType.MELHORIA, karmaCost: 20 },
        { name: 'Rajada Rápida', enhancementType: EnhancementType.MELHORIA, karmaCost: 20 },
        { name: 'Alcance Reduzido', enhancementType: EnhancementType.LIMITE, karmaCost: 10 },
      ],
    },
    {
      name: 'Proteção',
      powerType: 'Defesa',
      description: 'Pele impenetrável, campo de força ou armadura natural.',
      baseDamage: 0,
      baseRange: 'Pessoal',
      enhancements: [
        { name: 'Absorção de Energia', enhancementType: EnhancementType.MELHORIA, karmaCost: 20 },
        { name: 'Impérvio', enhancementType: EnhancementType.MELHORIA, karmaCost: 20 },
        { name: 'Requer Ativação', enhancementType: EnhancementType.LIMITE, karmaCost: 10 },
      ],
    },
  ];

  for (const power of powersData) {
    const createdPower = await prisma.catalogPower.create({
      data: {
        name: power.name,
        powerType: power.powerType,
        description: power.description,
        baseDamage: power.baseDamage,
        baseRange: power.baseRange,
        isOfficial: true,
      },
    });

    for (const enh of power.enhancements) {
      await prisma.catalogPowerEnhancement.create({
        data: {
          powerId: createdPower.id,
          name: enh.name,
          enhancementType: enh.enhancementType,
          karmaCost: enh.karmaCost,
          isOfficial: true,
        },
      });
    }
  }

  const talentsDrawbacksData = [
    {
      name: 'Artes Marciais',
      entryType: EntryType.TALENTO,
      description: 'Treinamento avançado em combate corpo a corpo.',
      mechanicalEffect: 'Concede bônus em manobras de imobilização e desarme.',
      karmaCost: 10,
    },
    {
      name: 'Franco-Atirador',
      entryType: EntryType.TALENTO,
      description: 'Precisão cirúrgica em ataques à distância.',
      mechanicalEffect: 'Ignora penalidades de cobertura parcial ao disparar.',
      karmaCost: 10,
    },
    {
      name: 'Vulnerável',
      entryType: EntryType.DESVANTAGEM,
      description: 'Fraqueza específica a um elemento ou substância.',
      mechanicalEffect: 'Recebe dano dobrado na presença do elemento.',
      karmaCost: 10,
    },
  ];

  for (const td of talentsDrawbacksData) {
    await prisma.catalogTalentDrawback.create({
      data: {
        name: td.name,
        entryType: td.entryType,
        description: td.description,
        mechanicalEffect: td.mechanicalEffect,
        karmaCost: td.karmaCost,
        isOfficial: true,
      },
    });
  }

  console.log('Catálogos oficiais povoados no Supabase com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });