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
  'uninsured motorist': 'This protects you if you\'re hit by a driver who doesn\'t have insurance.',
  'uninsured motorist bodily injury': 'This protects you if you\'re hit by a driver who doesn\'t have insurance and you get hurt.',
  'underinsured motorist': 'This helps pay your bills if the other driver\'s insurance isn\'t enough to cover your costs.',
  'underinsured motorist bodily injury': 'This helps pay your bills if the other driver\'s insurance isn\'t enough to cover your injuries.',
  'um/uim': 'This protects you if the other driver has no insurance or not enough insurance to cover your costs.',
  'um/uim bodily injury': 'This protects you if the other driver has no insurance or not enough insurance to cover your injuries.',
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

  // Renters coverages
  'contents coverage': 'This helps replace your belongings — like clothes, furniture, and electronics — if they\'re stolen or damaged.',
  'additional living expenses': 'If your rental is too damaged to live in, this pays for a place to stay while it\'s being fixed.',
  'renters liability': 'If someone gets hurt in your rental or you accidentally damage someone else\'s stuff, this helps pay for it.',
  'liability': 'If someone gets hurt on your property or you accidentally damage someone else\'s stuff, this helps pay for it.',

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
};

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
