import pool from './src/config/database.js';

async function updateNoticesWithSchemes() {
  try {
    console.log('🔄 Updating notices with Kerala Government welfare schemes...');
    
    // First, clear existing notices
    await pool.query('DELETE FROM notices');
    console.log('✅ Cleared existing notices');
    
    // Create admin user if not exists
    const adminResult = await pool.query(`
      INSERT INTO users (name, email, password, role) 
      VALUES ('Admin', 'admin@kerala.gov.in', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin') 
      ON CONFLICT (email) DO UPDATE SET role = 'admin'
      RETURNING id
    `);
    
    const adminId = adminResult.rows[0].id;
    console.log('✅ Admin user ready:', adminId);
    
    // Insert enhanced welfare scheme notices
    const schemes = [
      {
        title: '👵 Indira Gandhi National Old Age Pension (NOAP)',
        content: `₹1,600/month for citizens aged 60+ without family support.

**Eligibility:**
• Age: 60+ years (for NOAP category)
• Below Poverty Line (BPL) families
• No regular family income support
• Resident of Kerala for minimum 3 years

**Required Documents:**
• Age proof certificate
• BPL ration card
• Residence certificate
• Aadhaar card
• Bank passbook
• Declaration of no family support

**How to Apply:**
Apply through your local Grama Panchayat, Municipality, or Corporation office. Online applications also accepted through Kerala State Social Security Pension portal.

**Monthly Benefit:** ₹1,600 per month (₹200 Central + ₹1,400 State contribution)`,
        priority: 'high',
        scheme_type: 'oldage',
        color_theme: 'blue'
      },
      {
        title: '💔 Widow Pension Scheme',
        content: `₹1,600/month for widows below the poverty line.

**Eligibility:**
• Widow aged 18-59 years
• Below Poverty Line families
• Annual family income below ₹1 lakh
• Not receiving any other pension
• Resident of Kerala

**Required Documents:**
• Husband's death certificate
• Age proof of applicant
• Income certificate
• BPL ration card
• Aadhaar card
• Bank account details
• Residence proof

**How to Apply:**
Submit application at local self-government office with required documents. Processing time: 30-45 days.

**Monthly Benefit:** ₹1,600 per month`,
        priority: 'high',
        scheme_type: 'widow',
        color_theme: 'pink'
      },
      {
        title: '👩‍🦳 Unmarried Women Pension (50+ years)',
        content: `For women above 50 with no family income support.

**Eligibility:**
• Unmarried women aged 50+ years
• No regular family income
• Annual income below ₹1 lakh
• Not receiving other government pension
• Kerala resident for minimum 10 years

**Required Documents:**
• Age proof certificate
• Unmarried status certificate from Village Officer
• Income certificate
• Aadhaar card
• Bank passbook
• Residence certificate

**How to Apply:**
Apply through Grama Panchayat or Municipality with sworn affidavit of unmarried status.

**Monthly Benefit:** ₹1,600 per month`,
        priority: 'normal',
        scheme_type: 'unmarried',
        color_theme: 'pink'
      },
      {
        title: '♿ Disability Pension Scheme',
        content: `₹1,600/month for physically/mentally challenged individuals.

**Eligibility:**
• Persons with 40% or more disability
• Age: 18-59 years
• Below Poverty Line families
• Not employed in government sector
• Resident of Kerala

**Required Documents:**
• Disability certificate from Medical Board
• Age proof
• Income certificate
• BPL ration card
• Aadhaar card
• Bank account details
• Medical reports

**How to Apply:**
Apply through local body office with disability certificate from authorized medical officer.

**Monthly Benefit:** ₹1,600 per month (higher amounts for severe disabilities)`,
        priority: 'high',
        scheme_type: 'disability',
        color_theme: 'purple'
      },
      {
        title: '🌾 Agricultural Labour Pension',
        content: `₹1,600/month for aged agricultural labourers in Kerala.

**Eligibility:**
• Agricultural workers aged 60+ years
• Minimum 10 years of agricultural work
• Member of Agricultural Workers Welfare Fund
• Below Poverty Line
• Kerala resident for 10+ years

**Required Documents:**
• Age proof certificate
• Agricultural worker identity card
• Work experience certificate
• Welfare Fund membership proof
• Income certificate
• Bank account details

**How to Apply:**
Apply through Agricultural Department or local self-government office with proof of agricultural work.

**Monthly Benefit:** ₹1,600 per month`,
        priority: 'normal',
        scheme_type: 'agriculture',
        color_theme: 'green'
      },
      {
        title: '🏥 Vayomithram Project',
        content: `Health services and home care for senior citizens (65+).

**Services Included:**
• Regular health check-ups at home
• Medicine delivery service
• Emergency medical assistance
• Physiotherapy and rehabilitation
• Mental health counseling
• Nutritional guidance

**Eligibility:**
• Senior citizens aged 65+ years
• Residing in Kerala
• Limited mobility or health issues
• Preference to BPL families

**Required Documents:**
• Age proof
• Medical records
• Aadhaar card
• Residence proof
• Doctor's recommendation (if any)

**How to Apply:**
Contact nearest Primary Health Centre (PHC) or Community Health Centre (CHC).

**Services:** Free home-based healthcare and support services`,
        priority: 'normal',
        scheme_type: 'vayomithram',
        color_theme: 'green'
      },
      {
        title: '💖 Snehasparsham Scheme',
        content: `Monthly support for unwed mothers and women without family help.

**Eligibility:**
• Unwed mothers with children
• Women abandoned by family
• Destitute women without support
• Age: 18-60 years
• Below Poverty Line

**Support Provided:**
• Monthly financial assistance
• Skill development training
• Child care support
• Educational support for children
• Healthcare assistance

**Required Documents:**
• Identity proof
• Income certificate
• Child's birth certificate (if applicable)
• Medical certificates
• Social investigation report

**How to Apply:**
Apply through District Social Welfare Office or Women and Child Development Department.

**Monthly Benefit:** ₹1,000-₹2,000 based on family situation`,
        priority: 'normal',
        scheme_type: 'snehasparsham',
        color_theme: 'pink'
      }
    ];

    // Insert all schemes
    for (const scheme of schemes) {
      await pool.query(
        `INSERT INTO notices (title, content, priority, created_by) 
         VALUES ($1, $2, $3, $4)`,
        [scheme.title, scheme.content, scheme.priority, adminId]
      );
    }

    console.log('✅ Successfully added all Kerala welfare scheme notices!');
    console.log(`📊 Total schemes added: ${schemes.length}`);
    
  } catch (error) {
    console.error('❌ Error updating notices:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

updateNoticesWithSchemes()
  .then(() => {
    console.log('🎉 Notice update completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Notice update failed:', error);
    process.exit(1);
  });