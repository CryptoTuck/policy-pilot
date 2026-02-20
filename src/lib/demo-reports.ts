import type { PolicyReport } from '@/types/grading';

const demoReports: Record<string, PolicyReport> = {
  'demo-auto': {
    id: 'demo-auto',
    generatedAt: new Date().toISOString(),
    autoGrade: {
      overallGrade: 'F',
      overallScore: 47,
      riskTier: 'elevated',
      vehicleInfo: '2019 Honda Civic',
      standardCoverages: [
        {
          name: 'Bodily Injury Liability',
          limit: '$50,000/$100,000',
          score: 2,
          maxScore: 5,
          explanation:
            'Your bodily injury limits of $50,000 per person / $100,000 per accident are below what most carriers recommend. A single serious accident can easily exceed these limits, leaving you personally liable for the difference.',
          recommendation:
            'Most carriers recommend at least $100,000/$300,000 in bodily injury coverage to provide adequate protection.',
        },
        {
          name: 'Property Damage Liability',
          limit: '$25,000',
          score: 2,
          maxScore: 5,
          explanation:
            'Property damage liability of $25,000 is the minimum required in many states. Modern vehicles and property repairs frequently exceed this amount, which could leave you responsible for out-of-pocket costs.',
          recommendation:
            'Most carriers recommend at least $100,000 in property damage coverage.',
        },
        {
          name: 'Uninsured/Underinsured Motorist',
          limit: 'Not included',
          score: 1,
          maxScore: 5,
          explanation:
            'Uninsured/underinsured motorist coverage is not included on your policy. Roughly 1 in 8 drivers is uninsured. Without this coverage, you would have to rely on the at-fault driver\'s ability to pay for your injuries and damages.',
          recommendation:
            'Most carriers strongly recommend adding UM/UIM coverage that matches your bodily injury limits.',
        },
        {
          name: 'Medical Payments',
          limit: 'Not included',
          score: 1,
          maxScore: 5,
          explanation:
            'Medical payments coverage is not included on your current policy. This coverage pays for medical expenses for you and your passengers regardless of fault, providing quick access to funds after an accident.',
          recommendation:
            'Most carriers recommend at least $5,000 in medical payments coverage.',
        },
        {
          name: 'Collision Deductible',
          limit: '$1,000',
          score: 3,
          maxScore: 5,
          explanation:
            'A $1,000 collision deductible is a common choice that balances premium savings with manageable out-of-pocket costs after an accident.',
        },
        {
          name: 'Comprehensive Deductible',
          limit: '$1,000',
          score: 3,
          maxScore: 5,
          explanation:
            'A $1,000 comprehensive deductible is standard and covers non-collision events like theft, vandalism, and weather damage.',
        },
      ],
      additionalCoverages: [
        {
          name: 'Emergency Roadside Coverage',
          limit: 'Not included',
          present: false,
          relevance: 'situational',
          note: 'Most modern policies include roadside assistance as a low-cost add-on.',
        },
        {
          name: 'Car Rental Coverage',
          limit: 'Not included',
          present: false,
          relevance: 'often_worth_reviewing',
          note: 'Rental reimbursement provides a vehicle while yours is being repaired. Most carriers offer this for a few dollars per month.',
        },
        {
          name: 'Loan or Lease Assistance',
          limit: 'Not included',
          present: false,
          relevance: 'situational',
          note: 'If you owe more than your car is worth, gap coverage pays the difference between the actual cash value and your loan balance.',
        },
        {
          name: 'Glass Coverage',
          limit: 'Not included',
          present: false,
          relevance: 'situational',
          note: 'Full glass coverage can save you the cost of a deductible on windshield repairs and replacements.',
        },
        {
          name: 'Personal Injury Protection (PIP)',
          limit: 'Not included',
          present: false,
          relevance: 'often_worth_reviewing',
          note: 'PIP covers medical expenses and lost wages regardless of fault. Many carriers recommend this as essential coverage.',
        },
        {
          name: 'New Car Replacement',
          limit: 'Not included',
          present: false,
          relevance: 'low',
          note: 'New car replacement covers the cost of a brand-new vehicle if yours is totaled within the first few years.',
        },
      ],
      summary:
        'This policy provides only the minimum required coverage levels. The absence of uninsured/underinsured motorist coverage is a significant gap — roughly 1 in 8 drivers is uninsured. Bodily injury and property damage limits are well below carrier-recommended thresholds. Consider adding UM/UIM coverage and increasing liability limits to better protect your assets.',
      keyStrengths: [
        'Collision and comprehensive coverage included with standard deductibles',
      ],
      areasToReview: [
        'No uninsured/underinsured motorist coverage — a significant gap given the number of uninsured drivers on the road',
        'Bodily injury limits of $50K/$100K are below the $100K/$300K most carriers recommend',
        'No medical payments coverage to cover immediate medical expenses after an accident',
      ],
    },
  },

  'demo-home': {
    id: 'demo-home',
    generatedAt: new Date().toISOString(),
    homeGrade: {
      overallGrade: 'F',
      overallScore: 43,
      riskTier: 'elevated',
      standardCoverages: [
        {
          name: 'Dwelling',
          limit: '$185,000',
          score: 1,
          maxScore: 5,
          explanation:
            'Your dwelling coverage of $185,000 appears significantly below the estimated replacement cost of your home (~$350,000). This means if your home were destroyed, you could be responsible for over $165,000 out of pocket. Carriers flag policies where dwelling coverage is less than 80% of replacement cost.',
          recommendation:
            'Most carriers recommend insuring your dwelling to at least 100% of its estimated replacement cost.',
        },
        {
          name: 'Other Structures',
          limit: '$9,250',
          score: 2,
          maxScore: 5,
          explanation:
            'Other structures coverage of $9,250 (5% of dwelling) covers detached garages, fences, and sheds. This is the minimum standard ratio, which may not fully cover structures on larger properties.',
          recommendation:
            'Most carriers recommend 10% of dwelling coverage for other structures if you have significant detached structures.',
        },
        {
          name: 'Personal Property',
          limit: '$46,250',
          score: 2,
          maxScore: 5,
          explanation:
            'Personal property coverage of $46,250 (25% of dwelling) is at the lower end of the standard range. Most homeowners own belongings worth 50-75% of their dwelling coverage.',
          recommendation:
            'Most carriers recommend personal property coverage of at least 50% of dwelling coverage.',
        },
        {
          name: 'Loss of Use',
          limit: '$18,500',
          score: 2,
          maxScore: 5,
          explanation:
            'Loss of use coverage of $18,500 (10% of dwelling) would cover temporary living expenses if your home becomes uninhabitable. This amount may only cover a few months of alternative housing in many markets.',
          recommendation:
            'Most carriers recommend 20-30% of dwelling coverage for loss of use to ensure adequate temporary housing funds.',
        },
        {
          name: 'Personal Liability',
          limit: '$100,000',
          score: 2,
          maxScore: 5,
          explanation:
            'Personal liability of $100,000 is the minimum typically offered. A single lawsuit from an injury on your property could easily exceed this amount, putting your personal assets at risk.',
          recommendation:
            'Most carriers recommend at least $300,000 in personal liability coverage, with $500,000 or an umbrella policy for homeowners with significant assets.',
        },
        {
          name: 'Medical Payments',
          limit: '$1,000',
          score: 2,
          maxScore: 5,
          explanation:
            'Medical payments of $1,000 covers minor injuries to guests on your property without requiring a liability claim. This amount may not cover even a basic emergency room visit.',
          recommendation:
            'Most carriers recommend $5,000 in medical payments coverage.',
        },
        {
          name: 'Windstorm or Hail Deductible',
          limit: '5% of Dwelling',
          score: 2,
          maxScore: 5,
          explanation:
            'A windstorm/hail deductible of 5% of dwelling ($9,250) is a significant out-of-pocket expense when filing a wind or hail claim. This is a percentage-based deductible, meaning it scales with your dwelling coverage.',
          recommendation:
            'Most carriers recommend a 2% or lower wind/hail deductible where available.',
        },
      ],
      deductibleGrade: {
        name: 'All Perils Deductible',
        limit: '$5,000',
        score: 3,
        maxScore: 5,
        explanation:
          'Your all perils deductible of $5,000 represents approximately 2.7% of your dwelling coverage. While this keeps premiums lower, it means a significant out-of-pocket cost for any non-wind/hail claim.',
      },
      additionalCoverages: [
        {
          name: 'Ordinance or Law Coverage',
          limit: 'Not included',
          present: false,
          relevance: 'often_worth_reviewing',
          note: 'Most modern policies include ordinance or law coverage to pay for rebuilding to current building codes, which can add 10-25% to reconstruction costs.',
        },
        {
          name: 'Replacement Cost on Personal Property',
          limit: 'Not included',
          present: false,
          relevance: 'often_worth_reviewing',
          note: 'Without replacement cost, personal property is paid at actual cash value (depreciated). Most carriers now include replacement cost by default.',
        },
        {
          name: 'Water Backup & Sump Overflow',
          limit: 'Not included',
          present: false,
          relevance: 'often_worth_reviewing',
          note: 'Water backup is one of the most common homeowner claims and is not covered under a standard policy. Most carriers offer this endorsement for a small additional premium.',
        },
        {
          name: 'Service Line Coverage',
          limit: 'Not included',
          present: false,
          relevance: 'situational',
          note: 'Service line coverage protects against the cost of repairing underground pipes and utility lines running to your home.',
        },
        {
          name: 'Equipment Breakdown',
          limit: 'Not included',
          present: false,
          relevance: 'situational',
          note: 'Equipment breakdown covers mechanical and electrical failure of home systems like HVAC, water heaters, and appliances.',
        },
        {
          name: 'Identity Theft Coverage',
          limit: 'Not included',
          present: false,
          relevance: 'low',
          note: 'Identity theft coverage helps with expenses related to restoring your identity after fraud.',
        },
      ],
      summary:
        'This home policy has critical coverage gaps. The dwelling is insured for roughly 53% of estimated replacement cost, which would leave a substantial shortfall after a total loss. Liability limits are at the minimum, and no flood insurance is in place. Consider increasing dwelling coverage to full replacement cost, raising liability limits, and adding flood insurance — standard homeowners policies do not cover flood damage.',
      keyStrengths: [
        'All core coverage categories are present on the policy',
      ],
      areasToReview: [
        'No flood insurance — standard homeowners policies exclude flood damage, and this is often the most overlooked coverage gap',
        'Dwelling insured at ~$185,000 against an estimated ~$350,000 replacement cost — severely underinsured',
        'Personal liability of $100,000 is below the $300,000+ most carriers recommend for homeowners',
      ],
    },
  },

  'demo-renters': {
    id: 'demo-renters',
    generatedAt: new Date().toISOString(),
    rentersGrade: {
      overallGrade: 'D',
      overallScore: 60,
      riskTier: 'moderate',
      standardCoverages: [
        {
          name: 'Personal Property',
          limit: '$20,000',
          score: 3,
          maxScore: 5,
          explanation:
            'Personal property coverage of $20,000 provides a baseline level of protection for your belongings. Most renters underestimate the total value of their possessions — electronics, furniture, clothing, and appliances can add up quickly.',
          recommendation:
            'Most carriers recommend doing a home inventory to ensure your coverage matches the total value of your belongings. Many renters need $30,000-$50,000.',
        },
        {
          name: 'Loss of Use',
          limit: '$6,000',
          score: 3,
          maxScore: 5,
          explanation:
            'Loss of use coverage of $6,000 would help pay for temporary living expenses if your rental becomes uninhabitable. This may cover 1-2 months of alternative housing depending on your area.',
          recommendation:
            'Most carriers recommend loss of use coverage equal to several months of rent to ensure adequate temporary housing.',
        },
        {
          name: 'Personal Liability',
          limit: '$100,000',
          score: 3,
          maxScore: 5,
          explanation:
            'Personal liability of $100,000 is a standard starting point for renters. This protects you if someone is injured in your unit or if you accidentally damage the building.',
          recommendation:
            'Most carriers recommend $300,000 in liability coverage for better protection, especially if you have assets to protect.',
        },
        {
          name: 'Medical Payments',
          limit: '$1,000',
          score: 3,
          maxScore: 5,
          explanation:
            'Medical payments of $1,000 covers minor injuries to guests in your rental without requiring a liability claim. This is a standard amount for renters policies.',
          recommendation:
            'Most carriers recommend $5,000 in medical payments for better guest injury protection.',
        },
      ],
      additionalCoverages: [
        {
          name: 'Replacement Cost on Personal Property',
          limit: 'Included',
          present: true,
          relevance: 'often_worth_reviewing',
          note: 'Replacement cost means your belongings are covered at the cost to buy new, not depreciated value. This is an important coverage to have.',
        },
        {
          name: 'Water Backup & Sump Overflow',
          limit: 'Not included',
          present: false,
          relevance: 'often_worth_reviewing',
          note: 'Water backup is one of the most common renter claims, especially in ground-floor or basement units. Standard policies do not cover this — it requires a separate endorsement.',
        },
        {
          name: 'Increased Special Limits / Scheduled Personal Property',
          limit: '$3,000',
          present: true,
          relevance: 'often_worth_reviewing',
          note: 'Your policy includes a $3,000 special limit for high-value items like jewelry, electronics, art, and collectibles. Individual items worth more than this amount would not be fully covered under this sub-limit.',
        },
      ],
      summary:
        'This renters policy provides a solid foundation with all core coverages in place and replacement cost included. However, the $3,000 sub-limit on high-value categories (jewelry, electronics, art, collectibles) may leave expensive items underinsured. Adding water backup coverage is recommended, as it is one of the most common claims for renters and is not covered under the standard policy.',
      keyStrengths: [
        'Replacement cost on personal property is included',
        'All four core renters coverages are in place',
      ],
      areasToReview: [
        'Special limits cap of $3,000 on jewelry, electronics, art, and collectibles — individual high-value items may not be fully covered',
        'No water backup coverage — one of the most common renter claims, especially in ground-floor or basement units',
      ],
    },
  },
};

export function getDemoReport(id: string): PolicyReport | undefined {
  return demoReports[id];
}
