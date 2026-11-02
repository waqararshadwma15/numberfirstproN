/*
 * English copy. Page content follows the manager-approved reference (NumbersFirstS/index.html);
 * interface labels (navigation, theme, menus, selectors) keep the site's own wording.
 * The Arabic dictionary must match this shape.
 */

export const en = {
  meta: {
    siteTitle: "Numbers First | Bookkeeping & Financial Advisory in Saudi Arabia",
    siteDescription:
      "Monthly bookkeeping, VAT and Zakat filing, ZATCA e-invoicing and payroll (WPS), plus financial planning and advisory for Saudi SMEs. Fixed fees from SAR 1,000 a month.",
  },
  common: {
    brand: "NUMBERS FIRST",
    skip: "Skip to content",
    nav: {
      home: "Home",
      accounting: "Accounting & Bookkeeping",
      advisory: "Financial Planning & Advisory",
      clients: "Clients",
      contact: "Contact",
    },
    navShort: { accounting: "Accounting", advisory: "Advisory" },
    cta: {
      assessment: "Book a free assessment",
      assessmentShort: "Free assessment",
      whatsapp: "Chat on WhatsApp",
      explore: "Explore",
      packages: "See packages",
      backHome: "Back to home",
    },
    /* Pre-filled WhatsApp greeting, in the visitor's language. */
    waGreeting: "Hello, I would like a free assessment for my books.",
    switchLang: "العربية",
    switchLangLabel: "التبديل إلى العربية",
    theme: { toLight: "Switch to light theme", toDark: "Switch to dark theme" },
    menuOpen: "Open menu",
    menuClose: "Close menu",
    pathIndex: { accounting: "01", advisory: "02" },
    contact: {
      title: "Contact us",
      lead: "We reply within one working day.",
      mobile: "Mobile",
      whatsapp: "WhatsApp",
      email: "Email",
    },
    footer: {
      tagline: "Bookkeeping & financial advisory",
      serving: "Serving small and medium businesses across Saudi Arabia.",
      rights: "© 2026 Numbers First. Fees exclude 15% VAT.",
      solutions: "Solutions",
      company: "Company",
    },
    notFound: {
      title: "This page isn't on the books",
      lead: "The page you're looking for doesn't exist or has moved.",
    },
    /* Labels shared by both five-step journeys. */
    journey: {
      provide: "You provide",
      get: "You get",
      pause: "Pause",
      play: "Play",
      hint: "Tap any step",
    },
    /* Result panel shared by the request forms (there is no backend: the visitor sends it). */
    request: {
      sendWhatsapp: "Send on WhatsApp",
      sendEmail: "Email us",
      copy: "Copy request",
      copied: "Copied",
      empty: "-",
    },
  },

  home: {
    hero: {
      label: "Bookkeeping & financial advisory",
      titleA: "Your numbers,",
      titleB: "first.",
      lead: "Two ways we help Saudi small and medium businesses. Choose the one that fits today.",
      exploreAccounting: "Accounting and Bookkeeping",
      exploreAdvisory: "Financial Planning and Advisory",
      choose: "Choose your solution",
      emblemAlt: "Numbers First NF emblem with rising gold bars",
    },
    paths: {
      accounting: {
        title: "Accounting & Bookkeeping",
        summary: "Choose this if you need your books closed every month and VAT, Zakat, ZATCA and WPS handled on time.",
        points: ["ZATCA ready", "VAT & Zakat", "Payroll & WPS"],
        meta: "From SAR 1,000 / month",
        cta: "See the journey",
      },
      advisory: {
        title: "Financial Planning & Advisory",
        summary: "Choose this if you are planning a new business, a branch or an investment and need the numbers to decide.",
        points: ["Financial planning", "Investment", "Budgeting", "Monitor", "Controls"],
        meta: "Fixed project fee",
        cta: "See the journey",
      },
    },
    factsLabel: "At a glance",
    facts: [
      { title: "ZATCA ready", body: "E-invoicing on the Fatoora platform" },
      { title: "VAT & Zakat", body: "Returns filed on time" },
      { title: "Payroll & WPS", body: "Salaries and Mudad compliance" },
      { title: "Fixed fees", body: "SAR 1,000 to 5,000 a month" },
    ],
    clients: {
      label: "Clients",
      title: "Trusted by growing businesses",
      lead: "Clinics, retail, hospitality, sports, consulting and design businesses rely on Numbers First for their books.",
      sectorsLabel: "Sectors we serve",
      sectors: [
        "Healthcare",
        "Retail and e-commerce",
        "Hospitality",
        "Food and beverage (F&B)",
        "Sports and fitness",
        "Consulting",
        "Design and workspaces",
      ],
      logoSuffix: "logo",
    },
    sample: {
      label: "Sample report",
      title: "See what lands in your inbox every month",
      open: "View larger",
      close: "Close",
      items: [
        {
          title: "Profitability by branch",
          body: "Revenue, EBITDA and net profit by month.",
          alt: "Sample branch profitability page with revenue, EBITDA and net profit charts, client details hidden",
        },
        {
          title: "Detailed monthly P&L",
          body: "Every cost line, month by month, with margins.",
          alt: "Sample detailed monthly P&L table with figures blurred",
        },
        {
          title: "Conclusion and actions",
          body: "What the numbers mean and what to do next.",
          alt: "Sample conclusion page with key findings and recommended actions, figures blurred",
        },
      ],
      note: "Sample from a client engagement. Client name, locations and figures are hidden for confidentiality.",
    },
    faq: {
      label: "FAQ",
      title: "Questions businesses ask us",
      items: [
        {
          q: "What does Numbers First do?",
          a: "Two services for Saudi SMEs: monthly accounting and bookkeeping, and financial planning and advisory.",
        },
        {
          q: "How much does it cost?",
          a: "Bookkeeping is a fixed monthly fee of SAR 1,000 to 5,000, set by your balance sheet size and excluding 15% VAT. Advisory projects get a fixed fee after we review your plan.",
        },
        {
          q: "How do we start?",
          a: "Book a free assessment or send your business plan. You get a written proposal, then onboarding takes 14 days.",
        },
        { q: "How fast do you reply?", a: "Within one working day, by WhatsApp, phone or email." },
      ],
    },
    cta: {
      title: "Start with a look at your books",
      lead: "Tell us about your business. We will review your records and compliance and come back with a fixed-fee proposal.",
    },
  },

  accounting: {
    meta: {
      title: "Bookkeeping, VAT & Zakat Services in Saudi Arabia | Numbers First",
      description:
        "Books closed, returns filed, every month. Monthly bookkeeping, VAT and Zakat, ZATCA e-invoicing and payroll (WPS) for Saudi SMEs, for a fixed monthly fee from SAR 1,000.",
    },
    hero: {
      label: "Accounting & Bookkeeping",
      titleA: "Books closed.",
      titleB: "Returns filed.",
      titleC: "Every month.",
      lead: "Your bookkeeping journey in five steps. Each step shows what you give us and what you get back.",
    },
    /* Animated card in the hero: what every monthly close delivers (steps 4 and 5 of the journey). */
    checklist: {
      title: "Monthly close",
      period: "Every month",
      items: [
        "Books reconciled and closed",
        "VAT, Zakat and WPS handled on time",
        "P&L, balance sheet and cash-flow pack",
        "Clear actions for next month",
      ],
      done: "Numbers you can read, and a call to go through them.",
    },
    journey: {
      label: "Bookkeeping journey",
      cta: "See packages",
      steps: [
        {
          name: "Free assessment",
          when: "Day 1",
          kicker: "Step 1",
          desc: "A quick look at where your books and compliance stand today.",
          give: ["Recent bank statements", "Your VAT number and CR", "A short call with us"],
          get: ["A gap report on your books", "VAT and ZATCA readiness check"],
        },
        {
          name: "Fixed-fee proposal",
          when: "After the call",
          kicker: "Step 2",
          desc: "One clear price, set by the size of your balance sheet.",
          give: ["Number of staff and branches", "Rough monthly transactions"],
          get: ["Written scope of work", "One fixed monthly fee, from SAR 1,000"],
        },
        {
          name: "Onboarding",
          when: "14 days",
          kicker: "Step 3",
          desc: "We set everything up so the first month closes cleanly.",
          give: ["Access to your bank and accounting system", "Opening balances and past records"],
          get: ["Systems and Fatoora e-invoicing set up", "Opening balances checked"],
        },
        {
          name: "Monthly close",
          when: "Every month",
          kicker: "Step 4",
          desc: "Every transaction recorded, reconciled and closed.",
          give: ["Receipts and invoices for the month", "Payroll changes"],
          get: ["Books reconciled and closed", "VAT, Zakat and WPS handled on time"],
        },
        {
          name: "Reports & review",
          when: "Every month",
          kicker: "Step 5",
          desc: "Numbers you can read, and a call to go through them.",
          give: ["Time for a monthly review call"],
          get: ["P&L, balance sheet and cash-flow pack", "Clear actions for next month"],
        },
      ],
    },
    packages: {
      label: "Packages",
      title: "A fixed monthly fee that fits your size",
      lead: "Your package is set by the value of your balance sheet. After a free assessment you get a written proposal with the scope agreed.",
      selector: "What's your balance sheet value?",
      ranges: ["Under SAR 500K", "SAR 500K to 1M", "SAR 1M to 3M", "Above SAR 3M"],
      sar: "SAR",
      perMonth: "/ month",
      balanceSheet: "Balance sheet",
      popular: "Most popular",
      match: "Your match",
      choose: "Choose",
      plans: [
        {
          key: "starter",
          name: "Starter",
          price: 1000,
          criteria: "Under SAR 500K, or under 100 sales transactions",
          features: ["Monthly bookkeeping", "Quarterly VAT return", "Annual Zakat filing"],
        },
        {
          key: "standard",
          name: "Standard",
          price: 2000,
          criteria: "SAR 500K to 1M",
          features: ["Monthly bookkeeping", "Payroll up to 10 staff (WPS)", "Monthly P&L"],
        },
        {
          key: "growth",
          name: "Growth",
          price: 3500,
          criteria: "SAR 1M to 3M",
          features: ["Monthly bookkeeping", "ZATCA e-invoicing support", "Payroll up to 25 staff", "Budget and monthly reports"],
        },
        {
          key: "premium",
          name: "Premium",
          price: 5000,
          criteria: "Above SAR 3M",
          features: ["Everything in Growth", "Cash-flow forecast", "CFO-lite review", "Audit liaison and board pack"],
        },
      ],
      note: "Fees exclude 15% VAT. Backlog clean-up and system setup are quoted as a one-off fee.",
    },
    /* Cross-link to the other solution, using its card copy from the home page. */
    advisoryBridge: {
      title: "Financial Planning & Advisory",
      body: "Choose this if you are planning a new business, a branch or an investment and need the numbers to decide.",
      cta: "See the journey →",
    },
    /* Below the fold and collapsed; answers the questions people put to search and AI assistants. */
    faq: {
      label: "FAQ",
      title: "Accounting & bookkeeping questions",
      items: [
        {
          q: "How much does monthly bookkeeping cost in Saudi Arabia with Numbers First?",
          a: "A fixed monthly fee set by your balance sheet: Starter SAR 1,000 (under SAR 500K, or under 100 sales transactions), Standard SAR 2,000 (SAR 500K to 1M), Growth SAR 3,500 (SAR 1M to 3M) and Premium SAR 5,000 (above SAR 3M). Fees exclude 15% VAT.",
        },
        {
          q: "Do you handle ZATCA e-invoicing on the Fatoora platform?",
          a: "Yes. We set up your invoicing on ZATCA's Fatoora platform during onboarding, and ZATCA e-invoicing support is included from the Growth package. Your free assessment includes an e-invoicing readiness check.",
        },
        {
          q: "Do you prepare and file VAT and Zakat returns?",
          a: "Yes. VAT and Zakat returns are prepared and filed on time. Every package includes monthly bookkeeping, and the Starter package includes a quarterly VAT return and annual Zakat filing.",
        },
        {
          q: "Can you run payroll and WPS for my staff?",
          a: "Yes. We process salaries and handle Mudad and WPS compliance, including end-of-service calculations. Standard covers payroll for up to 10 staff and Growth for up to 25.",
        },
        {
          q: "How long does onboarding take?",
          a: "14 days. We set up systems, records and access, and check your opening balances before the first monthly close.",
        },
        {
          q: "Can you fix books that are behind?",
          a: "Yes. Backlog clean-up and system setup are quoted as a one-off fee, separate from the monthly package.",
        },
        {
          q: "When does a business have to register for VAT in Saudi Arabia?",
          a: "VAT registration is mandatory once taxable supplies exceed SAR 375,000 over the past 12 months, or are expected to in the next 12. Businesses above SAR 187,500 can register voluntarily. The standard VAT rate is 15%. We check your position as part of the free assessment.",
        },
        {
          q: "How often are VAT returns filed in Saudi Arabia, and when are they due?",
          a: "Businesses with annual taxable supplies above SAR 40 million file VAT returns monthly; most SMEs file quarterly. Each return, and any VAT payable, is due by the last day of the month after the period ends.",
        },
        {
          q: "When is the Zakat return due?",
          a: "The annual Zakat return is filed with ZATCA within 120 days of your financial year-end. We prepare it from closed, reconciled books, and annual Zakat filing is included from the Starter package.",
        },
        {
          q: "What are ZATCA e-invoicing Phase 1 and Phase 2?",
          a: "Phase 1 (Generation), in force since 4 December 2021, requires VAT-registered businesses to issue electronic invoices from a compliant system. Phase 2 (Integration) connects that system to ZATCA's Fatoora platform; it is rolled out in waves, and ZATCA notifies each business at least six months before its date. We prepare your invoicing for both.",
        },
      ],
    },
  },

  advisory: {
    meta: {
      title: "Financial Planning & Advisory for Saudi SMEs | Numbers First",
      description:
        "Business plans, investment appraisal (payback, NPV, IRR), budgets and budget-versus-actual monitoring for Saudi SMEs. One fixed project fee, agreed upfront.",
    },
    hero: {
      label: "Financial Planning & Advisory",
      titleA: "Decisions backed by",
      titleB: "your own numbers.",
      lead: "Your advisory journey in five waypoints, from business plan to controls. Each step shows what you give us and what you get back.",
    },
    chart: {
      actual: "Actual",
      forecast: "Forecast",
      budget: "Budget",
      caption: "Budget vs actual, reviewed monthly",
    },
    journey: {
      label: "Advisory journey",
      cta: "Send your business plan",
      steps: [
        {
          name: "Financial planning",
          when: "Waypoint 01",
          kicker: "Waypoint 01",
          desc: "Will the numbers work?",
          give: ["Your business idea or plan", "Expected costs and prices"],
          get: ["3 to 5 year P&L and cash-flow forecast", "Break-even point and funding need"],
        },
        {
          name: "Investment",
          when: "Waypoint 02",
          kicker: "Waypoint 02",
          desc: "Is it worth the money?",
          give: ["Set-up cost quotes", "How you plan to fund it"],
          get: ["Payback, NPV and IRR", "Investor- and bank-ready summary"],
        },
        {
          name: "Budgeting",
          when: "Waypoint 03",
          kicker: "Waypoint 03",
          desc: "What should each month look like?",
          give: ["Your team and branch structure", "Sales targets"],
          get: ["Monthly budget by branch", "Cash-flow budget and KPI targets"],
        },
        {
          name: "Monitor",
          when: "Waypoint 04",
          kicker: "Waypoint 04",
          desc: "Are we on track?",
          give: ["Monthly actuals, or we keep your books"],
          get: ["Budget-versus-actual report", "Gaps explained and forecast updated"],
        },
        {
          name: "Controls",
          when: "Waypoint 05",
          kicker: "Waypoint 05",
          desc: "Is the business protected as it grows?",
          give: ["How approvals and purchases work today"],
          get: ["Approval limits and authority matrix", "Cash, purchasing and stock controls"],
        },
      ],
    },
    industries: {
      label: "Industries we know",
      items: ["Sports & fitness", "Real estate", "Food and beverage (F&B)", "Hospitality", "Consultancy", "Design & creative"],
    },
    plan: {
      label: "Financial planning request",
      title: "Send us your business plan",
      lead: "Share a short brief and your plan. We will review it and reply with a scope, a timeline and a fixed project fee.",
      checks: ["Review of your plan and assumptions", "Recommended waypoints for your stage", "Fixed project fee before any work starts"],
      fields: {
        name: "Your name",
        company: "Company",
        phone: "Phone or WhatsApp",
        email: "Email address",
        brief: "Brief of the business plan",
        briefPlaceholder: "What is the business, where will it operate, and what do you need from us?",
        file: "Attach the business plan",
        fileNote: "PDF, Word, Excel or PowerPoint, up to 10 MB.",
        budget: "Total budget for the business plan",
        timing: "How soon do you want it?",
      },
      budgets: ["Under SAR 250K", "SAR 250K to 1M", "SAR 1M to 5M", "SAR 5M to 20M", "Above SAR 20M", "Not decided yet"],
      timings: ["Within 1 week", "Within 2 weeks", "Within a month", "In 1 to 3 months", "Just exploring"],
      errors: {
        name: "Please enter your name.",
        phone: "Please enter a phone or WhatsApp number.",
        brief: "Please add a short brief of the plan.",
        file: "The file is larger than 10 MB.",
      },
      submit: "Send my business plan",
      readyTitle: "Your request is ready.",
      readyBody: "Send it to us on WhatsApp or by email, and attach your business plan.",
      summary: {
        heading: "Financial planning request - Numbers First",
        subject: "Financial planning request",
        name: "Name",
        company: "Company",
        phone: "Phone/WhatsApp",
        email: "Email",
        brief: "Brief of business plan",
        budget: "Total budget",
        timing: "Needed",
        file: "File",
        attaching: "(attaching)",
      },
    },
    accountingBridge: {
      title: "Accounting & Bookkeeping",
      body: "Choose this if you need your books closed every month and VAT, Zakat, ZATCA and WPS handled on time.",
      cta: "See the journey →",
    },
    faq: {
      label: "FAQ",
      title: "Financial planning & advisory questions",
      items: [
        {
          q: "What does your financial planning and advisory service cover?",
          a: "Five waypoints, from business plan to controls: financial planning (3 to 5 year P&L and cash-flow forecast, break-even and funding need), investment appraisal (payback, NPV and IRR), budgeting by branch, monthly budget-versus-actual monitoring, and financial controls such as approval limits and an authority matrix.",
        },
        {
          q: "Who is it for?",
          a: "Saudi businesses planning a new venture, a new branch or an investment that need the numbers before they decide. We know sports and fitness, real estate, food and beverage (F&B), hospitality, consultancy, and design and creative businesses.",
        },
        {
          q: "How is financial advisory priced?",
          a: "One fixed project fee. We review your business plan first, then reply with a scope, a timeline and the fee before any work starts.",
        },
        {
          q: "Can you prepare the financial side of a feasibility study for investors or a bank?",
          a: "Yes. The investment waypoint gives you payback, NPV and IRR, with an investor- and bank-ready summary built on a 3 to 5 year forecast.",
        },
        {
          q: "Do I need to use your bookkeeping as well?",
          a: "No. For budget-versus-actual monitoring we work from your monthly actuals, or we can keep your books for you with an Accounting & Bookkeeping package.",
        },
      ],
    },
  },

  enquire: {
    meta: {
      title: "Book a Free Bookkeeping Assessment | Numbers First",
      description:
        "Tell us about your business. We will review your records and compliance and come back with a fixed-fee proposal.",
    },
    label: "Free assessment",
    title: "Start with a look at your books",
    lead: "Tell us about your business. We will review your records and compliance and come back with a fixed-fee proposal.",
    checks: ["Review of your bookkeeping and VAT position", "ZATCA e-invoicing readiness check", "Written proposal with a fixed monthly fee"],
    fields: {
      name: "Your name",
      company: "Company",
      balance: "Balance sheet value",
      phone: "Phone or WhatsApp",
      need: "What do you need help with?",
      needPlaceholder: "For example: monthly bookkeeping, VAT filing, ZATCA e-invoicing, payroll",
    },
    balances: ["Under SAR 500K", "SAR 500K to 1M", "SAR 1M to 3M", "Above SAR 3M", "Not sure"],
    errors: { name: "Please enter your name." },
    submit: "Prepare my request",
    readyTitle: "Your request is ready.",
    readyBody: "Copy it and send it to us on WhatsApp or by email.",
    summary: {
      heading: "Free assessment request - Numbers First",
      subject: "Free assessment request",
      name: "Name",
      company: "Company",
      balance: "Balance sheet",
      phone: "Phone/WhatsApp",
      need: "Needs",
    },
    direct: "Prefer to talk now?",
  },
};

export type Dict = typeof en;
