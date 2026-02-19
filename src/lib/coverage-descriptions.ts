const coverageDescriptions: Record<string, string> = {
  // Home coverages
  'dwelling': 'This pays to fix or rebuild your home if it gets damaged by things like fire, wind, or hail. It covers the structure of your house itself.',
  'other structures': 'This covers buildings on your property that aren\'t attached to your home, like a shed, fence, or detached garage.',
  'personal property': 'This helps replace your belongings — like clothes, furniture, and electronics — if they\'re stolen or damaged.',
  'loss of use': 'If your home is too damaged to live in, this pays for a place to stay and extra living costs while it\'s being fixed.',
  'personal liability': 'If someone gets hurt on your property or you accidentally damage someone else\'s stuff, this helps pay for it.',
  'medical payments (coverage f)': 'This pays small medical bills if a guest gets hurt at your home, even if it wasn\'t your fault.',
  'medical payments to others': 'This pays small medical bills if a guest gets hurt at your home, even if it wasn\'t your fault.',

  // Auto coverages
  'medical payments': 'Covers you, your passengers, and family members in your car during an accident. Helps pay for reasonable, necessary medical and funeral expenses for you, your passengers, or insured family members, regardless of fault.',
  'bodily injury': 'This pays for other people\'s medical bills if you cause a car accident that hurts someone.',
  'bodily injury liability': 'This pays for other people\'s medical bills if you cause a car accident that hurts someone.',
  'property damage': 'This pays to fix or replace someone else\'s car or property if you cause an accident.',
  'property damage liability': 'This pays to fix or replace someone else\'s car or property if you cause an accident.',
  'uninsured motorist': 'Protects you, your passengers, and your vehicle if you are in an accident with a driver who has no insurance or is a hit-and-run driver. It covers bodily injury (medical bills, lost wages, pain and suffering) and property damage to your car.',
  'uninsured motorist bodily injury': 'Protects you and your passengers if you are in an accident with a driver who has no insurance or is a hit-and-run driver. It covers medical bills, lost wages, and pain and suffering.',
  'underinsured motorist': 'Protects you, your passengers, and your vehicle if you are in an accident with an at-fault driver whose insurance isn\'t enough to cover your costs. It covers bodily injury (medical bills, lost wages, pain and suffering) and property damage to your car.',
  'underinsured motorist bodily injury': 'Protects you and your passengers if you are in an accident with an at-fault driver whose insurance isn\'t enough to cover your costs. It covers medical bills, lost wages, and pain and suffering.',
  'uninsured/underinsured motorist': 'Protects you, your passengers, and your vehicle if you are in an accident with an at-fault driver who has no insurance, insufficient insurance, or is a hit-and-run driver. It covers bodily injury (medical bills, lost wages, pain and suffering) and property damage to your car.',
  'um/uim': 'Protects you, your passengers, and your vehicle if you are in an accident with an at-fault driver who has no insurance, insufficient insurance, or is a hit-and-run driver. It covers bodily injury (medical bills, lost wages, pain and suffering) and property damage to your car.',
  'um/uim bodily injury': 'Protects you and your passengers if you are in an accident with an at-fault driver who has no insurance, insufficient insurance, or is a hit-and-run driver. It covers medical bills, lost wages, and pain and suffering.',
  'collision': 'This pays to fix your car if you hit another car or object, no matter who caused the accident.',
  'comprehensive': 'This pays to fix your car if it\'s damaged by something other than a crash — like theft, a fallen tree, or hail.',
  'personal injury protection': 'This pays for your medical bills and lost wages after an accident, no matter who was at fault.',
  'pip': 'This pays for your medical bills and lost wages after an accident, no matter who was at fault.',
  'medical payments coverage': 'This helps pay medical bills for you and your passengers after a car accident.',
  'rental reimbursement': 'This pays for a rental car while your car is being fixed after a covered accident.',
  'roadside assistance': 'This covers services like towing, flat tire changes, and jump-starts if your car breaks down.',
  'towing': 'This pays for towing your car if it breaks down or can\'t be driven.',
  'gap coverage': 'If your car is totaled and you owe more than it\'s worth, this pays the difference.',
  'uninsured motorist property damage': 'This pays to fix your car if you\'re hit by a driver who doesn\'t have insurance.',
  'underinsured motorist property damage': 'This helps pay to fix your car if the other driver\'s insurance isn\'t enough.',

  'emergency roadside coverage': 'Covers services like towing, flat tire changes, jump-starts, and lockout assistance if your car breaks down on the road.',
  'car rental coverage': 'Pays for a rental car while your vehicle is being repaired after a covered accident, so you can stay on the road.',
  'loan or lease assistance': 'If your financed or leased vehicle is totaled, this covers the gap between what you owe and what your car is worth.',
  'glass coverage': 'Covers the repair or replacement of your vehicle\'s windshield and windows, often with no deductible.',
  'new car replacement': 'If your new car is totaled within the first few years, this pays for a brand new replacement vehicle of the same make and model instead of the depreciated value.',
  'oem coverage': 'Ensures that original equipment manufacturer (OEM) parts are used when repairing your vehicle after an accident, rather than aftermarket parts.',

  // Renters coverages
  'contents coverage': 'This helps replace your belongings — like clothes, furniture, and electronics — if they\'re stolen or damaged.',
  'additional living expenses': 'If your rental is too damaged to live in, this pays for a place to stay while it\'s being fixed.',
  'renters liability': 'If someone gets hurt in your rental or you accidentally damage someone else\'s stuff, this helps pay for it.',
  'liability': 'If someone gets hurt on your property or you accidentally damage someone else\'s stuff, this helps pay for it.',

  // Home additional coverages
  'replacement cost on personal property': 'This means your personal belongings will be replaced at today\'s prices for brand new items, rather than being paid out at their depreciated value.',
  'increased special limits': 'Provides higher coverage limits for valuable items like jewelry, electronics, or collectibles beyond the standard policy limits.',
  'water backup & sump pump overflow': 'Covers damage if water backs up through your drains or sump pump and floods your home.',
  'water backup and sump overflow': 'Covers damage if water backs up through your drains or sump pump and floods your home.',
  'water backup and sump pump overflow': 'Covers damage if water backs up through your drains or sump pump and floods your home.',

  // Additional/optional coverages
  'water backup': 'This covers damage if water backs up through your drains or sump pump and floods your home.',
  'water backup coverage': 'This covers damage if water backs up through your drains or sump pump and floods your home.',
  'identity theft': 'This helps cover costs if someone steals your identity, like legal fees and lost wages.',
  'identity theft coverage': 'This helps cover costs if someone steals your identity, like legal fees and lost wages.',
  'equipment breakdown': 'This covers the cost to fix or replace home appliances and systems that break down, like your AC or water heater.',
  'equipment breakdown coverage': 'This covers the cost to fix or replace home appliances and systems that break down, like your AC or water heater.',
  'service line coverage': 'This pays to fix underground pipes and wires that connect your home to public utilities.',
  'ordinance or law': 'This helps pay extra costs to bring your home up to current building codes when you\'re making repairs.',
  'ordinance or law coverage': 'This helps pay extra costs to bring your home up to current building codes when you\'re making repairs.',
  'flood insurance': 'This covers damage to your home and belongings caused by flooding. Regular home insurance usually doesn\'t cover floods.',
  'earthquake coverage': 'This covers damage to your home caused by an earthquake. Regular home insurance usually doesn\'t cover earthquakes.',
  'umbrella': 'This gives you extra liability protection beyond what your home or auto policy covers — like a safety net for big claims.',
  'umbrella coverage': 'This gives you extra liability protection beyond what your home or auto policy covers — like a safety net for big claims.',
  'scheduled personal property': 'This gives extra coverage for expensive items like jewelry, art, or collectibles that have special value.',
  'jewelry coverage': 'This gives extra coverage for your jewelry beyond the normal limits of your policy.',
  'valuable articles': 'This gives extra coverage for expensive items like jewelry, art, or collectibles that have special value.',
  'home business coverage': 'This covers your business equipment and liability if you run a business from your home.',
  'animal liability': 'This covers costs if your pet hurts someone or damages their property.',
  'deductible': 'This is the amount you pay out of your own pocket before your insurance starts paying for a claim.',
  'wind/hail deductible': 'This is the amount you pay out of pocket before insurance covers damage from wind or hail.',
  'hurricane deductible': 'This is the amount you pay out of pocket before insurance covers hurricane damage. It\'s usually a percentage of your home\'s value.',
  'all other perils deductible': 'This is the amount you pay out of pocket for most types of damage claims, like fire or theft.',
  'replacement cost': 'This means your insurance will pay to replace damaged items with brand new ones, not used ones.',
  'extended replacement cost': 'This gives you extra money above your dwelling limit to rebuild your home if costs go higher than expected.',
  'loss assessment': 'If you live in a condo or HOA and there\'s shared damage, this helps cover your share of the cost.',
  'loss assessment coverage': 'If you live in a condo or HOA and there\'s shared damage, this helps cover your share of the cost.',
  'mold coverage': 'This covers the cost to clean up and fix mold damage in your home.',
  'debris removal': 'Covers the cost to clean up and haul away debris from your property after a covered loss, like a fallen tree or storm damage.',
};

function normalizeCoverageKey(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

const coverageImageMap: Record<string, string> = {
  [normalizeCoverageKey('Dwelling')]: 'dwelling.png',
  [normalizeCoverageKey('Dwelling (Coverage A)')]: 'dwelling.png',
  [normalizeCoverageKey('Other Structures')]: 'other-structures.png',
  [normalizeCoverageKey('Other Structures (Coverage B)')]: 'other-structures.png',
  [normalizeCoverageKey('Personal Property')]: 'personal-property.png',
  [normalizeCoverageKey('Personal Property (Coverage C)')]: 'personal-property.png',
  [normalizeCoverageKey('Loss of Use')]: 'loss-of-use.png',
  [normalizeCoverageKey('Loss of Use (Coverage D)')]: 'loss-of-use.png',
  [normalizeCoverageKey('Personal Liability')]: 'personal-liability.png',
  [normalizeCoverageKey('Personal Liability (Coverage E)')]: 'personal-liability.png',
  [normalizeCoverageKey('Medical Payments (Coverage F)')]: 'medical-payments-home.png',
  [normalizeCoverageKey('Medical Payments to Others')]: 'medical-payments-home.png',
  [normalizeCoverageKey('Medical Payments')]: 'medical-payments-auto.png',
  [normalizeCoverageKey('All Perils Deductible')]: 'all-perils-deductible.png',
  [normalizeCoverageKey('Windstorm or Hail Deductible')]: 'windstorm-hail-deductible.png',
  [normalizeCoverageKey('Extended Replacement Cost')]: 'extended-replacement-cost.png',
  [normalizeCoverageKey('Ordinance or Law Coverage')]: 'ordinance-or-law.png',
  [normalizeCoverageKey('Ordinance or Law')]: 'ordinance-or-law.png',
  [normalizeCoverageKey('Replacement Cost on Personal Property')]: 'replacement-cost-personal-property.png',
  [normalizeCoverageKey('Water Backup & Sump Overflow')]: 'water-backup.png',
  [normalizeCoverageKey('Water Backup and Sump Overflow')]: 'water-backup.png',
  [normalizeCoverageKey('Service Line Coverage')]: 'service-line.png',
  [normalizeCoverageKey('Equipment Breakdown')]: 'equipment-breakdown.png',
  [normalizeCoverageKey('Increased Special Limits')]: 'increased-special-limits.png',
  [normalizeCoverageKey('Scheduled Personal Property')]: 'increased-special-limits.png',
  [normalizeCoverageKey('Identity Theft Coverage')]: 'identity-theft.png',
  [normalizeCoverageKey('Identity Theft')]: 'identity-theft.png',
  [normalizeCoverageKey('Bodily Injury Liability')]: 'bodily-injury-liability.png',
  [normalizeCoverageKey('Bodily Injury')]: 'bodily-injury-liability.png',
  [normalizeCoverageKey('Property Damage Liability')]: 'property-damage-liability.png',
  [normalizeCoverageKey('Property Damage')]: 'property-damage-liability.png',
  [normalizeCoverageKey('Uninsured/Underinsured Motorist')]: 'uninsured-underinsured.png',
  [normalizeCoverageKey('Uninsured Motorist')]: 'uninsured-underinsured.png',
  [normalizeCoverageKey('Underinsured Motorist')]: 'uninsured-underinsured.png',
  [normalizeCoverageKey('Collision Deductible')]: 'collision-deductible.png',
  [normalizeCoverageKey('Collision')]: 'collision-deductible.png',
  [normalizeCoverageKey('Comprehensive Deductible')]: 'comprehensive-deductible.png',
  [normalizeCoverageKey('Comprehensive')]: 'comprehensive-deductible.png',
  [normalizeCoverageKey('Emergency Roadside Coverage')]: 'emergency-roadside.png',
  [normalizeCoverageKey('Roadside Assistance')]: 'emergency-roadside.png',
  [normalizeCoverageKey('Car Rental Coverage')]: 'car-rental.png',
  [normalizeCoverageKey('Rental Reimbursement')]: 'car-rental.png',
  [normalizeCoverageKey('Loan or Lease Assistance')]: 'loan-lease-assistance.png',
  [normalizeCoverageKey('Gap Coverage')]: 'loan-lease-assistance.png',
  [normalizeCoverageKey('Glass Coverage')]: 'glass-coverage.png',
  [normalizeCoverageKey('Personal Injury Protection')]: 'pip.png',
  [normalizeCoverageKey('PIP')]: 'pip.png',
  [normalizeCoverageKey('New Car Replacement')]: 'new-car-replacement.png',
  [normalizeCoverageKey('OEM Coverage')]: 'oem-coverage.png',
  [normalizeCoverageKey('Loss Assessment Coverage')]: 'loss-assessment.png',
  [normalizeCoverageKey('Loss Assessment')]: 'loss-assessment.png',
  [normalizeCoverageKey('Building Additions & Alterations')]: 'building-additions.png',
  [normalizeCoverageKey('Building Additions')]: 'building-additions.png',
};

const coverageBenefitExplanations: Record<string, string> = {
  // Home additional coverages
  'Ordinance or Law Coverage': 'Pays for the extra cost to rebuild or repair your home to current building codes after a covered loss. This is important because older homes often don\'t meet today\'s requirements.',
  'Replacement Cost on Personal Property': 'Reimburses you for the cost to replace your belongings with new items, not their depreciated value. This helps you recover fully after a loss instead of settling for less.',
  'Water Backup & Sump Overflow': 'Covers damage caused by water backing up through drains or sump pump failures. These losses are typically excluded from standard homeowners policies.',
  'Service Line Coverage': 'Covers repair or replacement of underground utility lines like water, sewer, or electric that run from the street to your home. Repairs can be expensive and are usually the homeowner\'s responsibility.',
  'Equipment Breakdown': 'Covers sudden mechanical or electrical failure of major home systems and appliances. It helps pay for repairs or replacement not caused by wear and tear or age alone.',
  'Identity Theft Coverage': 'Helps cover expenses related to restoring your identity after fraud, such as legal fees, lost wages, and credit monitoring. It provides support and reimbursement during a stressful and time-consuming recovery process.',

  // Auto additional coverages
  'Emergency Roadside Coverage': 'Helps cover towing, lockouts, jump-starts, and flat tires if your car breaks down. It saves you from paying out-of-pocket when you\'re stuck on the side of the road.',
  'Car Rental Coverage': 'Pays for a rental car while your vehicle is being repaired after a covered claim. This keeps you mobile without disrupting your daily routine.',
  'Loan or Lease Assistance': 'Covers the gap between what your car is worth and what you still owe if it\'s totaled. This prevents you from making payments on a vehicle you no longer have.',
  'Glass Coverage': 'Covers repair or replacement of cracked or shattered glass, often with little to no deductible. It\'s especially useful since windshield damage is common and can worsen quickly.',
  'Personal Injury Protection (PIP)': 'Helps pay for medical bills, lost wages, and essential services after an accident, regardless of fault. It provides fast access to benefits when you need them most.',
  'New Car Replacement': 'Replaces your totaled vehicle with a brand-new one of the same make and model instead of paying depreciated value. This is valuable in the first few years of ownership when depreciation hits hardest.',
};

const normalizedBenefitEntries = Object.entries(coverageBenefitExplanations).map(([key, description]) => ({
  key: normalizeCoverageKey(key),
  description,
}));

export function getCoverageDescription(name: string): string | undefined {
  const lower = name.toLowerCase().trim();

  // Exact match first
  if (coverageDescriptions[lower]) {
    return coverageDescriptions[lower];
  }

  // Fuzzy match: check if any key is contained in the name, or name is contained in the key
  for (const [key, description] of Object.entries(coverageDescriptions)) {
    if (lower.includes(key) || key.includes(lower)) {
      return description;
    }
  }

  return undefined;
}

export function getCoverageBenefitExplanation(name: string): string | undefined {
  const normalized = normalizeCoverageKey(name);

  const exactMatch = normalizedBenefitEntries.find((entry) => entry.key === normalized);
  if (exactMatch) {
    return exactMatch.description;
  }

  const fuzzyMatch = normalizedBenefitEntries.find((entry) =>
    normalized.includes(entry.key) || entry.key.includes(normalized),
  );
  return fuzzyMatch?.description;
}

export function getCoverageImagePath(name: string): string | undefined {
  const normalized = normalizeCoverageKey(name);

  if (coverageImageMap[normalized]) {
    return `/images/coverages/${coverageImageMap[normalized]}`;
  }

  for (const [key, filename] of Object.entries(coverageImageMap)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return `/images/coverages/${filename}`;
    }
  }

  return undefined;
}
