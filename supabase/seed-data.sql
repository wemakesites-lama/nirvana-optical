-- Nirvana Optical Seed Data
-- Run this after schema.sql to populate initial data

-- ============================================
-- PROMO BANNERS (from constants.ts)
-- ============================================

INSERT INTO promo_banners (headline, subheadline, image_url, image_alt, layout, link_url, link_text, is_active, sort_order, background_color)
VALUES
  (
    'Free Kids Eye Tests',
    'Comprehensive eye exams for children under 12. Early detection is key to healthy vision development.',
    '/stock children glasses.jpg',
    'Child wearing stylish glasses',
    'text-overlay',
    '/services',
    'Learn More',
    true,
    1,
    '#1a3c34'
  ),
  (
    'Designer Frames Collection',
    'Explore our curated selection of premium eyewear from top international brands.',
    '/stock tommy hilfiger eyewear.jpg',
    'Designer eyewear display',
    'text-overlay',
    '/gallery',
    'View Collection',
    true,
    2,
    '#2d5a4a'
  ),
  (
    'Medical Aid Welcome',
    'We accept all medical aids. Get quality eyecare with your benefits.',
    '/stock eye test 2.jpg',
    'Professional eye examination',
    'text-overlay',
    '/medical-aid',
    'Check Coverage',
    true,
    3,
    '#1a3c34'
  )
ON CONFLICT DO NOTHING;

-- ============================================
-- TESTIMONIALS (from constants.ts)
-- ============================================

INSERT INTO testimonials (name, rating, quote, is_featured, sort_order)
VALUES
  ('Thabo M.', 5, 'The team at Nirvana Optical made getting my new glasses so easy. The eye test was thorough and they helped me find the perfect frames. Highly recommend!', true, 1),
  ('Sarah K.', 5, 'Best optical service in Mahikeng! They took their time to explain everything about my prescription and helped me choose lenses that work perfectly for my lifestyle.', true, 2),
  ('John D.', 5, 'I''ve been coming here for years. The staff are always friendly and professional. My whole family gets their eyes tested here.', true, 3),
  ('Lerato P.', 5, 'Finally found an optometrist who truly cares! They caught an issue with my eyes that others had missed. So grateful for their expertise.', true, 4),
  ('Michael B.', 5, 'Quick service, great selection of frames, and they process medical aid claims on the spot. What more could you ask for?', false, 5),
  ('Amanda N.', 5, 'The kids'' eye test was fantastic. They were so patient with my children and made the whole experience fun. Will definitely be back!', true, 6)
ON CONFLICT DO NOTHING;

-- ============================================
-- FAQ ITEMS (from constants.ts)
-- ============================================

INSERT INTO faq_items (category, question, answer, sort_order)
VALUES
  -- Eye Tests
  ('Eye Tests', 'How often should I have an eye test?', 'We recommend a comprehensive eye examination every 1-2 years for adults, and annually for children, seniors, and those with existing eye conditions or diabetes. Regular tests help detect vision changes and eye health issues early.', 1),
  ('Eye Tests', 'What happens during an eye examination?', 'Our comprehensive eye exam includes visual acuity testing, refraction assessment for prescription, eye pressure measurement, and examination of your eye health using specialised equipment. The entire process takes about 30-45 minutes.', 2),
  ('Eye Tests', 'Do you offer eye tests for driver''s licence renewals?', 'Yes! We provide official eye tests for driver''s licence applications and renewals. The test is quick, and we provide the necessary documentation for the traffic department.', 3),

  -- Frames & Lenses
  ('Frames & Lenses', 'How do I choose the right frames for my face shape?', 'Our experienced staff will help you find frames that complement your face shape, skin tone, and lifestyle. Generally, choose frames that contrast with your face shape - round faces suit angular frames, while square faces look great with rounder styles.', 4),
  ('Frames & Lenses', 'What types of lenses do you offer?', 'We offer a wide range including single vision, bifocal, and progressive lenses. We also provide specialised options like blue light filtering, photochromic (transitions), polarised sunglasses lenses, and high-index thin lenses for strong prescriptions.', 5),
  ('Frames & Lenses', 'How long does it take to get new glasses?', 'Standard prescriptions are typically ready within 3-5 working days. Complex prescriptions or special lens orders may take 7-10 working days. We''ll give you an accurate timeframe when you order.', 6),

  -- Contact Lenses
  ('Contact Lenses', 'Can I get contact lenses instead of glasses?', 'Most people can wear contact lenses. We offer a contact lens fitting service where we assess your suitability, teach you insertion and removal, and find the most comfortable lenses for your eyes and lifestyle.', 7),
  ('Contact Lenses', 'What types of contact lenses are available?', 'We stock daily disposables, monthly lenses, toric lenses for astigmatism, and multifocal contact lenses. Our optometrist will recommend the best option based on your prescription and wearing preferences.', 8),

  -- Medical Aid
  ('Medical Aid', 'Do you accept medical aid?', 'Yes, we are contracted with all major South African medical aids. We can process your claim directly, so you only pay the portion not covered by your plan (if any).', 9),
  ('Medical Aid', 'What does medical aid typically cover?', 'Most medical aids cover one comprehensive eye test per year and contribute towards frames and lenses. The amount varies by plan - some cover basic frames while others include premium options. We''ll check your benefits when you visit.', 10),
  ('Medical Aid', 'Can I use my medical aid savings for eyewear?', 'Absolutely! You can use your Medical Savings Account (MSA) or day-to-day benefits for optical services and eyewear. We''ll help you maximise your available benefits.', 11),

  -- Booking
  ('Booking', 'How do I book an appointment?', 'You can book online using our Setmore booking system, call us directly, or send us a WhatsApp message. Walk-ins are welcome, but appointments ensure minimal waiting time.', 12),
  ('Booking', 'What should I bring to my appointment?', 'Please bring your current glasses (if any), a list of any medications you take, your medical aid card, and ID document. If you have previous prescription records from another optometrist, those are helpful too.', 13)
ON CONFLICT DO NOTHING;

-- ============================================
-- BLOG POSTS (from placeholder-data.ts)
-- ============================================

INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, status, published_at, author)
VALUES
  (
    'Understanding Digital Eye Strain: Tips for the Modern Age',
    'understanding-digital-eye-strain',
    'Learn how to protect your eyes from the effects of prolonged screen time with practical tips from our optometrists.',
    '## What is Digital Eye Strain?

In today''s digital world, most of us spend hours each day staring at screens—whether it''s for work, entertainment, or staying connected. This prolonged screen exposure can lead to a condition known as digital eye strain or computer vision syndrome.

### Common Symptoms

- Dry, irritated eyes
- Blurred vision
- Headaches
- Neck and shoulder pain
- Difficulty focusing

### Practical Tips to Reduce Eye Strain

**1. Follow the 20-20-20 Rule**

Every 20 minutes, take a 20-second break to look at something 20 feet away. This simple practice helps relax your eye muscles and reduce fatigue.

**2. Optimise Your Workspace**

- Position your screen at arm''s length
- Keep the top of your monitor at or below eye level
- Reduce glare with proper lighting
- Consider a matte screen protector

**3. Consider Blue Light Filtering**

While research is ongoing, many people find relief with blue light filtering lenses, especially when using screens in the evening. Ask us about adding this coating to your next pair of glasses.

### When to See an Optometrist

If you experience persistent symptoms despite trying these tips, it may be time for a comprehensive eye examination. Your prescription may need updating, or you might benefit from specialised computer glasses.

*Visit Nirvana Optical for a thorough assessment and personalised recommendations.*',
    '/stock eye test 2.jpg',
    'published',
    NOW() - INTERVAL '2 days',
    'Dr. Olebogeng Molefe'
  ),
  (
    'How to Choose the Perfect Frames for Your Face Shape',
    'choosing-frames-face-shape',
    'Finding the right frames can transform your look. Here''s our expert guide to matching eyewear with your unique face shape.',
    '## Finding Your Perfect Frames

Choosing new glasses is an exciting opportunity to express your personal style while ensuring optimal vision. The key is understanding how different frame shapes complement various face types.

### Identify Your Face Shape

**Round Face**
- Equal width and length
- Soft, curved features
- *Best frames:* Angular, rectangular frames add definition

**Square Face**
- Strong jawline
- Broad forehead
- *Best frames:* Round or oval frames soften angles

**Oval Face**
- Balanced proportions
- Slightly curved jawline
- *Best frames:* Most styles work—lucky you!

**Heart Face**
- Wider forehead
- Narrow chin
- *Best frames:* Bottom-heavy frames or cat-eye styles balance proportions

### Beyond Face Shape

Consider these additional factors:

**Skin Tone**
- Warm tones suit gold, brown, and warm-coloured frames
- Cool tones complement silver, black, and jewel tones

**Lifestyle**
- Active lifestyle? Consider durable, flexible frames
- Professional environment? Classic styles never go wrong

**Prescription Strength**
- High prescriptions benefit from smaller frames
- Thinner, high-index lenses reduce lens thickness

### Try Before You Buy

At Nirvana Optical, we encourage you to try on multiple styles. Our experienced staff will guide you through the selection process, considering your face shape, colouring, and personal preferences.

*Book an appointment today and let us help you find your perfect frames.*',
    '/stock multi eyewear.avif',
    'published',
    NOW() - INTERVAL '5 days',
    'Nirvana Optical Team'
  ),
  (
    'The Importance of Children''s Eye Exams',
    'childrens-eye-exams',
    'Regular eye exams are crucial for children''s development. Learn why early detection matters and what to expect during a paediatric eye exam.',
    '## Why Children''s Eye Health Matters

Vision plays a crucial role in a child''s development—from learning to read to playing sports and building social connections. Yet many vision problems go undetected because children often don''t know what "normal" vision looks like.

### Warning Signs to Watch For

Parents should be aware of these potential indicators of vision problems:

- Sitting too close to the TV or holding books very close
- Frequent eye rubbing
- Squinting or tilting the head
- Difficulty concentrating in school
- Avoiding reading or close-up activities
- Complaints of headaches or tired eyes

### What to Expect at a Paediatric Eye Exam

Our child-friendly exams are designed to be engaging and stress-free:

1. **Visual Acuity Testing** using age-appropriate charts
2. **Eye Alignment Check** to detect strabismus (crossed eyes)
3. **Eye Movement Assessment** tracking and focusing abilities
4. **Internal Eye Health Examination** using gentle techniques

### When to Schedule Exams

- **First exam:** 6-12 months old
- **Preschool:** 3 years old
- **School age:** Before Grade 1, then annually

### Our Child-Friendly Approach

At Nirvana Optical, we make eye exams fun! Our optometrist is experienced with children of all ages and uses games and child-sized equipment to ensure accurate results and a positive experience.

*We offer free eye tests for children under 12. Book your child''s appointment today!*',
    '/stock child glasses.jpg',
    'published',
    NOW() - INTERVAL '8 days',
    'Dr. Olebogeng Molefe'
  ),
  (
    'Understanding Your Driver''s Licence Eye Test',
    'drivers-licence-eye-test',
    'Need an eye test for your driver''s licence? Here''s everything you need to know about the requirements and what to expect.',
    '## Driver''s Licence Eye Tests at Nirvana Optical

Whether you''re applying for a new driver''s licence or renewing an existing one, you''ll need to pass an eye test. At Nirvana Optical, we''re authorised to conduct these tests and provide the necessary documentation.

### Minimum Vision Requirements

South African law requires drivers to meet specific visual standards:

**Visual Acuity**
- 6/12 or better in at least one eye
- With or without corrective lenses

**Field of Vision**
- Minimum 70 degrees temporal and 30 degrees nasal in each eye
- Or 115 degrees combined horizontal field

### What We Test

Our comprehensive driver''s vision assessment includes:

1. **Distance vision** using a Snellen chart
2. **Peripheral vision** to ensure adequate side awareness
3. **Colour vision** for traffic light recognition
4. **Depth perception** for judging distances

### What If I Fail?

If you don''t meet the requirements without glasses:

- We''ll determine the correct prescription for driving
- A restriction code will be added to your licence requiring you to wear corrective lenses while driving

### What to Bring

- Your ID document
- Current glasses or contact lenses (if you wear them)
- Previous licence (if renewing)

### Quick and Convenient

The test takes only 10-15 minutes, and we provide immediate documentation for the traffic department. No appointment necessary—walk-ins welcome!

*Visit Nirvana Optical for your driver''s licence eye test today.*',
    '/stock drivers eye test.webp',
    'published',
    NOW() - INTERVAL '12 days',
    'Nirvana Optical Team'
  ),
  (
    'Contact Lenses vs Glasses: Making the Right Choice',
    'contact-lenses-vs-glasses',
    'Wondering whether contact lenses or glasses are better for you? We break down the pros and cons to help you decide.',
    '## Glasses or Contacts? Finding What Works for You

The choice between glasses and contact lenses isn''t always straightforward. Many people use both, depending on the situation. Here''s a comprehensive guide to help you decide.

### The Case for Glasses

**Pros:**
- Low maintenance—just put them on!
- No touching your eyes
- Can double as a fashion accessory
- Often more cost-effective long-term
- Provide some protection against dust and debris

**Cons:**
- Can fog up or get wet in rain
- May not suit active sports
- Peripheral vision slightly limited
- Some people feel self-conscious

### The Case for Contact Lenses

**Pros:**
- Natural field of vision
- Ideal for sports and active lifestyles
- No fogging or weather issues
- Freedom to wear non-prescription sunglasses

**Cons:**
- Require daily care and hygiene
- Regular replacement needed
- Not suitable for all eye conditions
- Risk of infection if not properly maintained

### Modern Options

**Daily Disposables**
Perfect for occasional wear or travel—no cleaning required.

**Monthly Lenses**
Cost-effective for daily wearers, with proper care.

**Multifocal Contacts**
For those who need reading and distance correction.

**Specialised Lenses**
Available for astigmatism and other specific needs.

### Our Recommendation

Many of our patients benefit from having both options:
- Glasses for home and relaxed settings
- Contacts for sports, special occasions, or work

*Book a contact lens consultation at Nirvana Optical to explore your options.*',
    '/stock contact lense on finger.jpg',
    'published',
    NOW() - INTERVAL '18 days',
    'Dr. Olebogeng Molefe'
  ),
  (
    'Protecting Your Eyes This Summer',
    'summer-eye-protection',
    'Summer brings unique challenges for eye health. Discover how to keep your eyes safe while enjoying the sunshine.',
    '## Summer Eye Care Guide

As temperatures rise and we spend more time outdoors, it''s essential to protect our eyes from the harsh African sun. Here''s your complete guide to summer eye care.

### The Dangers of UV Exposure

UV rays can cause both short-term and long-term damage:

**Immediate Effects:**
- Photokeratitis (sunburn of the cornea)
- Temporary vision problems
- Eye irritation and redness

**Long-term Risks:**
- Cataracts
- Macular degeneration
- Pterygium (growths on the eye)
- Increased skin cancer risk around the eyes

### Choosing the Right Sunglasses

Not all sunglasses are created equal. Look for:

- **100% UV protection** (UV400 rating)
- **Wraparound styles** for side protection
- **Polarised lenses** to reduce glare
- **Quality lenses** that won''t distort vision

### Beyond Sunglasses

**Wide-brimmed hats** reduce UV exposure by up to 50%

**Avoid peak sun hours** (10 AM - 4 PM) when possible

**Stay hydrated** to prevent dry eyes

**Use artificial tears** if your eyes feel dry

### Prescription Sunglasses

If you wear glasses, consider:
- Prescription sunglasses for clear vision and protection
- Photochromic lenses that adapt to light conditions
- Clip-on sunglasses for convenience

### Children Need Protection Too

Children''s eyes are more susceptible to UV damage. Ensure they wear proper sunglasses whenever they''re outdoors.

*Visit Nirvana Optical for quality prescription sunglasses and UV-protective eyewear.*',
    '/stock eyewear 2.jpg',
    'published',
    NOW() - INTERVAL '25 days',
    'Nirvana Optical Team'
  ),
  (
    'What Are Progressive Lenses?',
    'understanding-progressive-lenses',
    'Progressive lenses offer seamless vision correction for multiple distances. Learn if they''re right for you.',
    '## Progressive Lenses Explained

If you''re over 40 and find yourself holding your phone at arm''s length to read, you might be experiencing presbyopia—a natural part of ageing. Progressive lenses could be the solution.

### What Are Progressive Lenses?

Progressive lenses, also called multifocal or varifocal lenses, provide correction for:
- **Distance vision** (top of lens)
- **Intermediate vision** (middle—computer distance)
- **Near vision** (bottom—reading)

Unlike bifocals, there''s no visible line, and the transition between zones is gradual and seamless.

### Benefits of Progressives

**Convenience**
One pair of glasses for all activities—no switching between reading and distance glasses.

**Natural Vision**
The smooth transition mimics how your eyes naturally focus at different distances.

**Youthful Appearance**
No telltale bifocal line that announces your age.

### Adaptation Period

Most people adjust to progressives within 1-2 weeks. Tips for adaptation:

- Wear them consistently (not just for reading)
- Point your nose at what you want to see
- Move your head, not just your eyes
- Be patient—it gets easier!

### Are Progressives Right for You?

Consider progressives if you:
- Need both distance and reading correction
- Use a computer regularly
- Want one pair for most activities
- Prefer a line-free appearance

### Quality Matters

Premium progressive lenses offer:
- Wider reading areas
- Less peripheral distortion
- Better adaptation
- Customised designs

*Visit Nirvana Optical for a progressive lens consultation and experience the difference quality makes.*',
    '/stock Optometry machine.jpg',
    'published',
    NOW() - INTERVAL '30 days',
    'Dr. Olebogeng Molefe'
  ),
  (
    'The Benefits of Regular Eye Exams',
    'benefits-regular-eye-exams',
    'Eye exams aren''t just about updating your prescription. Discover what else your optometrist can detect during a comprehensive examination.',
    '## More Than Just Vision Testing

Many people only visit an optometrist when they notice vision changes. However, comprehensive eye exams reveal much more about your overall health than you might expect.

### What We Check (Beyond Prescription)

**Eye Pressure**
High intraocular pressure can indicate glaucoma, a condition that causes irreversible vision loss if untreated.

**Retinal Health**
Your retina can show early signs of:
- Diabetes
- High blood pressure
- High cholesterol
- Certain cancers

**Eye Coordination**
Problems with how your eyes work together can cause headaches, reading difficulties, and fatigue.

**Dry Eye Assessment**
Chronic dry eye is increasingly common and can affect quality of life.

### Early Detection Saves Sight

Many serious eye conditions have no early symptoms:

**Glaucoma** - "The silent thief of sight" - causes gradual peripheral vision loss

**Macular Degeneration** - Leading cause of vision loss in older adults

**Diabetic Retinopathy** - Can be detected before you even know you have diabetes

### Who Should Have Regular Exams?

**Adults (18-60):** Every 1-2 years

**Seniors (60+):** Annually

**Children:** Annually during school years

**High-risk groups:** As recommended
- Diabetics
- Family history of eye disease
- High myopia (short-sightedness)
- Previous eye injuries

### Make It a Habit

Think of eye exams like dental check-ups or annual physicals—a routine part of preventive healthcare.

*Book your comprehensive eye examination at Nirvana Optical today. Your future self will thank you.*',
    '/stock eye test chart.jpg',
    'published',
    NOW() - INTERVAL '35 days',
    'Dr. Olebogeng Molefe'
  )
ON CONFLICT (slug) DO NOTHING;
