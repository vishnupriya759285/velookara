import pool from './src/config/database.js';

async function addNotices() {
  try {
    console.log('🔄 Adding welfare pension notices to database...');
    
    // First, create an admin user if one doesn't exist
    let adminUser;
    try {
      const adminCheck = await pool.query("SELECT id FROM users WHERE email = 'admin@kerala.gov' LIMIT 1");
      if (adminCheck.rows.length > 0) {
        adminUser = adminCheck.rows[0];
        console.log('✅ Found existing admin user');
      } else {
        const adminResult = await pool.query(
          `INSERT INTO users (name, email, password, role) 
           VALUES ($1, $2, $3, $4) 
           RETURNING id`,
          ['Kerala Government Admin', 'admin@kerala.gov', '$2a$10$hashedpassword', 'admin']
        );
        adminUser = adminResult.rows[0];
        console.log('✅ Created admin user');
      }
    } catch (error) {
      console.error('Error with admin user:', error.message);
      return;
    }

    const notices = [
      {
        title: 'Social Security Pension (Sevana Pension)',
        content: `The Social Security Pension (often called Sevana Pension) is meant for poor residents who are old, widowed, or physically or mentally disabled. 

**Eligibility:** Very poor persons under categories: old age, widows, physically or mentally disabled, etc.

**Pension Amount:** ₹1,600 per month. The Central Government contributes a small amount under the National Social Assistance Programme, and the rest is paid by the state.

**How to Apply:** Applications are accepted through the local bodies such as Grama Panchayats, Municipalities, or Corporations.`,
        priority: 'high'
      },
      {
        title: 'Old Age Pension',
        content: `The Old Age Pension is available for elderly people in Kerala who belong to poor households.

**Eligibility:** Elderly people in Kerala who belong to poor households.

**Pension Amount:** ₹1,600 per month under the state scheme. Those above the age of 75 may receive a slightly higher amount.

**How to Apply:** Applications should be made through the local body with proof of age, income, and residence.`,
        priority: 'normal'
      },
      {
        title: 'Widow Pension',
        content: `The Widow Pension is provided to women who have lost their husbands or whose husbands have been missing for more than seven years.

**Eligibility:** Women who have lost their husbands or whose husbands have been missing for more than seven years, from poor families.

**Pension Amount:** ₹1,600 per month.

**How to Apply:** Applicants must not already receive another welfare pension and should apply through their local self-government office.`,
        priority: 'normal'
      },
      {
        title: 'Disability Pension',
        content: `The Disability Pension is for persons with at least 80% disability or those certified under the state's disability criteria.

**Eligibility:** Persons with at least 80% disability or those certified under the state's disability criteria.

**Pension Amount:** ₹1,600 per month, and in some severe cases, the benefit may be higher.

**How to Apply:** Applicants must have a valid disability certificate and apply through their local government office.`,
        priority: 'normal'
      },
      {
        title: 'Pension for Unmarried Women above 50 Years',
        content: `The Pension for Unmarried Women above 50 Years is meant for women who have remained unmarried and are aged fifty or above.

**Eligibility:** Women who have remained unmarried, aged 50 or above, residents of Kerala with annual income not exceeding ₹1 lakh, not receiving any other pension.

**Pension Amount:** ₹1,600 per month.

**How to Apply:** Apply through local self-government offices. Must renew application periodically by submitting a life certificate.`,
        priority: 'normal'
      },
      {
        title: 'Agriculture Labour Pension',
        content: `The Agriculture Labour Pension is available to agricultural workers who meet specific criteria.

**Eligibility:** Agricultural workers who have worked for at least ten years, aged 60 or above, residents of Kerala for at least ten years, members of the Kerala Agricultural Workers Welfare Fund.

**Pension Amount:** ₹1,600 per month.

**How to Apply:** Applications are handled through the local self-government offices.`,
        priority: 'normal'
      },
      {
        title: 'Kerala Freedom Fighters Pension Scheme',
        content: `The Kerala Freedom Fighters Pension Scheme is given to those who participated in the freedom struggle and suffered imprisonment, or to their surviving family members.

**Eligibility:** Freedom fighters who participated in the freedom struggle and suffered imprisonment, or their surviving family members such as widows or unmarried children.

**Pension Amount:** ₹3,000 per month.

**How to Apply:** Applicants need to provide documents such as a jail certificate and age proof to the General Administration Department of the Government of Kerala.`,
        priority: 'high'
      }
    ];

    // Insert notices
    for (const notice of notices) {
      await pool.query(
        `INSERT INTO notices (title, content, priority, created_by) 
         VALUES ($1, $2, $3, $4)`,
        [notice.title, notice.content, notice.priority, adminUser.id]
      );
      console.log(`✅ Added notice: ${notice.title}`);
    }

    console.log('🎉 All notices added successfully!');
    
  } catch (error) {
    console.error('❌ Error adding notices:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

addNotices()
  .then(() => {
    console.log('✅ Notice insertion completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Failed to add notices:', error);
    process.exit(1);
  });