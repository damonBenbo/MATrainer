const { Client } = require("pg");
const db = require('./db');

db.connect();

// Sample data for users
const usersData = [
  { username: 'test', email: 'test@test.com', password: 'password1' },
];

// Sample data for techniques
const techniquesData = [
  { name: 'Front Kick', description: 'A kick executed by lifting the knee straight forward, while keeping the foot and shin hanging freely and then straightening the leg.', video_url: 'https://youtu.be/rDAIlfTFDqU', created_by: 1 },
  { name: 'Roundhouse Kick', description: 'A kick executed by lifting the knee and then turning the supporting foot and body, then extending the leg striking with the top of the foot.', video_url: 'https://youtu.be/BZmIA4Sseco', created_by: 1 },
  { name: 'Hook Punch', description: 'A punch executed by turning the hips and shoulders while keeping the elbow bent at a right angle, striking with the side of the fist.', video_url: 'https://youtu.be/0gtMKaCJ5I8', created_by: 1 },
  { name: 'Front Snap Kick', description: 'A fast kick executed by snapping the leg forward, striking with the ball of the foot.', video_url: 'https://youtu.be/JvFCqQb9k9Y', created_by: 1 },
  { name: 'Side Kick', description: 'A kick executed by raising the knee to the side and extending the leg straight out to the side, striking with the edge of the foot.', video_url: 'https://youtu.be/98boTtEjgfw', created_by: 1 },
  { name: 'Back Fist Strike', description: 'A strike executed by extending the arm backward and then quickly snapping it forward, striking with the back of the fist.', video_url: 'https://youtu.be/_2KRkDpeuLw', created_by: 1 },
  { name: 'Elbow Strike', description: 'A strike executed by bringing the elbow down or forward, striking with the point of the elbow.', video_url: 'https://youtu.be/_2KRkDpeuLw', created_by: 1 },
  { name: 'Knee Strike', description: 'A strike executed by lifting the knee and driving it forward into the target, striking with the kneecap.', video_url: 'https://youtu.be/sERtk-89xmI', created_by: 1 },
  { name: 'Sweeping Leg Takedown', description: 'A takedown technique used to trip an opponent by sweeping their legs out from under them.', video_url: 'https://youtu.be/0Rd3EGFg6Gg', created_by: 1 },
  { name: 'Spinning Back Kick', description: 'A powerful kick executed by spinning the body 180 degrees and striking with the heel of the foot.', video_url: 'https://youtu.be/oxcACgbbAlw', created_by: 1 },
  { name: 'Knifehand Strike', description: 'A strike executed by extending the fingers and thumb, with the hand held rigid, and striking with the edge of the hand.', video_url: 'https://youtu.be/rKcan5OtAJ4', created_by: 1 },
  { name: 'Front Chokehold Escape', description: 'A self-defense technique to escape a front chokehold by using leverage and force to break free.', video_url: 'https://youtu.be/Zc4vojrh_hA', created_by: 1 },
  { name: 'Bear Hug Escape', description: 'A self-defense technique to escape a bear hug hold by using leverage and counter-pressure.', video_url: 'https://youtu.be/JcJ6TBHSUiU', created_by: 1 },
  { name: 'Hammer Fist Strike', description: 'A powerful strike executed by bringing the fist down in a hammering motion, striking with the knuckles.', video_url: 'https://youtu.be/OVWndHyvxFg', created_by: 1 },
  { name: 'Front Sweep Kick', description: 'A sweeping kick executed by targeting the opponent\'s front leg, causing them to lose balance and fall.', video_url: 'https://youtu.be/Cg3WwHU9uBc', created_by: 1 },
  { name: 'Ground and Pound', description: 'A ground-fighting technique where the fighter strikes the opponent while on the ground, typically in a dominant position.', video_url: 'https://youtu.be/Y4uFk8kS7Lw', created_by: 1 },
  { name: 'Ankle Lock Submission', description: 'A submission hold targeting the opponent\'s ankle joint, applying pressure to force a tap-out.', video_url: 'https://youtu.be/NoFuhd9W5Pk', created_by: 1 },
  { name: 'Side Control Escape', description: 'A technique used to escape from an opponent\'s side control position in ground fighting.', video_url: 'https://youtu.be/UYMFHxG-mI0', created_by: 1 },
  { name: 'High Block', description: 'A blocking technique to protect against high strikes, raising the forearm to intercept attacks.', video_url: 'https://youtu.be/tS0EvPEc0QQ', created_by: 1 },
  { name: 'Low Kick', description: 'A kick targeting the opponent\'s lower leg or thigh, aiming to disrupt their balance.', video_url: 'https://youtu.be/mXb5Nolg30Y', created_by: 1 },
  { name: 'Arm Drag Takedown', description: 'A takedown technique used to control and manipulate the opponent\'s arm, leading to a takedown.', video_url: 'https://youtu.be/r5D5FBq0IBA', created_by: 1 },
];

// Sample data for patterns
const patternsData = [
  { name: 'Ki Mase Punching', description: 'From ready stance, low block and then punch.', video_url: 'https://youtu.be/jq4ZcvZ0DoA', created_by: 1 },
  { name: 'Middle Block', description: 'Chamber and rotate arm to block midsection.', video_url: 'https://youtu.be/MUOwz7cHSaI', created_by: 1 },
  { name: 'Crane Stance Form', description: 'A traditional form involving the use of a crane stance, incorporating strikes, blocks, and transitions.', video_url: 'https://youtu.be/inNVbsAyaRU', created_by: 1 },
  { name: 'Dragon Kata', description: 'A kata inspired by dragon movements, featuring flowing techniques and circular motions.', video_url: 'https://youtu.be/GpGhzzn_qzA', created_by: 1 },
  { name: 'Tiger Claw Form', description: 'A form that mimics the powerful and precise movements of a tiger, emphasizing claw-like strikes and precision.', video_url: 'https://youtu.be/fTm6M6X2zhE', created_by: 1 },
  { name: 'Eagle Wing Pattern', description: 'A pattern inspired by the graceful and sharp movements of an eagle, incorporating strikes and evasive maneuvers.', video_url: 'https://www.youtube.com/shorts/yfnso950Ebw?feature=share', created_by: 1 },
  { name: 'Snake Style Sequence', description: 'A sequence of movements inspired by the fluid and unpredictable nature of a snake, featuring strikes and joint locks.', video_url: 'https://youtu.be/Q1zEomYmDJU', created_by: 1 },
  { name: 'Golden Crane Technique', description: 'A technique that combines crane-inspired movements with the concept of inner energy and balance.', video_url: 'https://youtu.be/6IDsMNGtQ7M', created_by: 1 },
  { name: 'Leopard Style Pattern', description: 'A pattern inspired by the agile and ferocious movements of a leopard, featuring quick strikes and agility.', video_url: 'https://youtu.be/MOtlkbv9jws', created_by: 1 },
  { name: 'Double Dragon Form', description: 'A form that involves the coordination of two practitioners, emphasizing teamwork and synchronization.', video_url: 'https://youtu.be/aYLtS5oiKaE', created_by: 1 },
  { name: 'Whirling Wind Sequence', description: 'A sequence of movements that mimic the swirling and unpredictable nature of a whirling wind.', video_url: 'https://www.youtube.com/shorts/FwSYZZKEepo?feature=share', created_by: 1 },
];

// Sample data for forms
const formsData = [
  { name: 'Wing Chun', description: 'Wing Chun is a concept-based martial art, a form of Southern Chinese kung fu, and a close-quarters system of self-defense.', video_url: 'https://youtu.be/7gFykSb1edM', created_by: 1 },
  { name: 'Taekwondo', description: 'Taekwondo is a Korean martial art involving punching and kicking techniques.', video_url: 'https://youtu.be/j6KchQAVjhI', created_by: 1 },
  { name: 'Hapkido', description: 'Hapkido is a Korean martial art that focuses on self-defense techniques, joint locks, and throws.', created_by: 1 },
  { name: 'Krav Maga', description: 'Krav Maga is a practical self-defense system developed by the Israeli military, emphasizing efficiency and quick responses.', created_by: 1 },
  { name: 'Judo Kata', description: 'Judo Kata involves a series of predetermined techniques and throws used for training and competition.', created_by: 1 },
  { name: 'Kung Fu', description: 'Kung Fu is a Chinese martial art known for its diverse techniques, forms, and philosophy.', created_by: 1 },
  { name: 'Capoeira', description: 'Capoeira is a Brazilian martial art that combines elements of dance, acrobatics, and music.', created_by: 1 },
  { name: 'Muay Thai', description: 'Muay Thai, also known as Thai Boxing, is a striking martial art from Thailand known for its powerful kicks, elbows, and knees.', created_by: 1 },
  { name: 'Brazilian Jiu-Jitsu', description: 'Brazilian Jiu-Jitsu is a grappling-based martial art that focuses on ground fighting and submissions.', created_by: 1 },
  { name: 'Tai Chi', description: 'Tai Chi is a Chinese martial art known for its slow, flowing movements that promote relaxation and balance.', created_by: 1 },
  { name: 'Karate Kata', description: 'Karate Kata involves a series of predefined forms and techniques used for training and discipline.', created_by: 1 },
  { name: 'Wushu', description: 'Wushu is a modern Chinese martial art that combines elements of traditional Chinese martial arts with gymnastics and acrobatics.', created_by: 1 },
  { name: 'Aikido', description: 'Aikido is a Japanese martial art that focuses on using an opponent’s energy and movements for self-defense.', created_by: 1 },
  { name: 'Tang Soo Do', description: 'Tang Soo Do is a Korean martial art that combines elements of Karate and traditional Korean techniques.', created_by: 1 },
  { name: 'Kali', description: 'Kali, also known as Eskrima or Arnis, is a Filipino martial art that emphasizes stick and weapon fighting.', created_by: 1 },
  { name: 'Silat', description: 'Silat is a Southeast Asian martial art known for its close combat techniques and fluid movements.', created_by: 1 },
  { name: 'Jeet Kune Do', description: 'Jeet Kune Do is a martial art and philosophy developed by Bruce Lee, emphasizing practicality and adaptability.', created_by: 1 },
  { name: 'Kalaripayattu', description: 'Kalaripayattu is an Indian martial art that includes strikes, kicks, grappling, and weaponry.', created_by: 1 },
  { name: 'Kyudo', description: 'Kyudo is the Japanese martial art of archery, focusing on form, concentration, and precision.', created_by: 1 },
  { name: 'Boxing', description: 'Boxing is a Western combat sport that emphasizes punching techniques, footwork, and head movement.', created_by: 1 },
  { name: 'Wrestling', description: 'Wrestling is a combat sport involving grappling and takedowns, with variations like freestyle and Greco-Roman.', created_by: 1 },
];

// Sample data for weapons
const weaponsData = [
  { name: 'Nunchaku', description: 'Nunchaku is a traditional Asian martial arts weapon consisting of two sticks connected by a metal chain or rope.', img: 'https://www.kombativ.com/images/products/large/wooden-nunchaku-with-grip.jpg', created_by: 1 },
  { name: 'Bo Staff', description: 'A staff weapon used with both hands and varies in length depending on the form.', img: 'https://cdn11.bigcommerce.com/s-tmx09/images/stencil/338x338/products/789/1189/1903-6__67443.1521570598.jpg?c=2', created_by: 1 },
  { name: 'Sai', description: 'Sai is a traditional Okinawan weapon with a metal prong on each side, used for blocking and striking.', img: 'https://www.japaneseswords4samurai.com/wp-content/uploads/2018/04/SH7601.jpg', created_by: 1 },
  { name: 'Escrima Sticks', description: 'Escrima sticks, also known as Arnis or Kali sticks, are Filipino martial arts weapons often used in pairs.', img: 'https://martialartssupermarket.com/wp-content/uploads/2015/03/1912.jpg', created_by: 1 },
  { name: 'Katana', description: 'The katana is a traditional Japanese sword with a curved, slender blade, known for its sharpness and precision.', img: 'https://battlingblades.com/cdn/shop/products/DSC01282.jpg?v=1527247735&width=1080', created_by: 1 },
  { name: 'Kama', description: 'Kama are Okinawan farming tools adapted into weapons, featuring a sickle-like blade and often used in pairs.', img: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Kamas.jpg', created_by: 1 },
  { name: 'Jian', description: 'The Jian is a Chinese double-edged straight sword known for its versatility and use in martial arts and Tai Chi.', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Sword_with_Scabbard_MET_DP119025_brightened_2x3.jpg', created_by: 1 },
  { name: 'Bokken', description: 'The bokken is a wooden training sword used in Japanese martial arts for safe practice of sword techniques.', img: 'https://centurymartialarts.com/cdn/shop/products/bokken-306528.jpg?v=1687810462', created_by: 1 },
  { name: 'Tonfa', description: 'The tonfa is a traditional Okinawan weapon consisting of a stick with a handle perpendicular to the shaft.', img: 'https://centurymartialarts.com/cdn/shop/products/polypropylene-tonfa-559190.jpg?v=1687810947', created_by: 1 },
  { name: 'Naginata', description: 'The naginata is a Japanese pole weapon with a curved blade at the end, used for slashing and thrusting.', img: 'https://www.darkknightarmoury.com/wp-content/uploads/2019/10/SH1020.jpg', created_by: 1 },
  { name: 'Kusarigama', description: 'The kusarigama is a Japanese chain weapon with a sickle and a weighted chain, known for its versatility.', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Kusarigama-crop.jpg/640px-Kusarigama-crop.jpg', created_by: 1 },
  { name: 'Tanto', description: 'The tanto is a Japanese short knife, often used as a secondary weapon in martial arts and self-defense.', img: 'https://m.media-amazon.com/images/I/513sqIwmRZL.jpg', created_by: 1 },
  { name: 'Kunai', description: 'Kunai are traditional Japanese throwing knives, often used by ninjas for both combat and utility purposes.', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Kunai05.jpg/220px-Kunai05.jpg', created_by: 1 },
  { name: 'Three-Section Staff', description: 'The three-section staff is a Chinese weapon with three connected staff sections, used for striking and trapping.', img: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/3-sectional-staff.jpg', created_by: 1 },
  { name: 'Shuriken', description: 'Shuriken are small, star-shaped throwing weapons commonly associated with ninjas.', img: 'https://allninjagear.com/images/thumbs/0002808_mourning-star-ninja-shuriken_580.jpeg', created_by: 1 },
  { name: 'Kubotan', description: 'The kubotan is a handheld self-defense tool often used for pressure point strikes and joint locks.', img: 'https://selfdefensekeychainstore.com/cdn/shop/products/S262e81961e314a10b79255df310ca5e82.jpg?v=1693180581&width=1445', created_by: 1 },
  { name: 'Tessen', description: 'Tessen are Japanese iron fans, which conceal a sharp edge and can be used for both defense and offense.', img: 'https://i.etsystatic.com/6203752/r/il/8d68ea/2105314487/il_fullxfull.2105314487_50wv.jpg', created_by: 1 },
  { name: 'Meteor Hammer', description: 'The meteor hammer is a traditional Chinese weapon consisting of two iron balls connected by a rope or chain.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp_tsphRsx6m_9OJ64tWCmBfJkhKH9--l75wtICpthUzR84vR5RauGyojoRF_Gk9ElrN0&usqp=CAU', created_by: 1 },
];

// Function to insert sample data into the database
async function seedDatabase() {
    try {
      await db.query('BEGIN');
  
      // Insert data into the users table and get the generated user IDs
      const userInsertQuery = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id';
      const userResult = await db.query(userInsertQuery, [usersData[0].username, usersData[0].email, usersData[0].password]);
      const userId = userResult.rows[0].id;
  
      // Insert data into the techniques table
      for (const technique of techniquesData) {
        await db.query('INSERT INTO techniques (name, description, video_url, created_by) VALUES ($1, $2, $3, $4)', [technique.name, technique.description, technique.video_url, userId]);
      }
  
      // Insert data into the patterns table
      for (const pattern of patternsData) {
        await db.query('INSERT INTO patterns (name, description, video_url, created_by) VALUES ($1, $2, $3, $4)', [pattern.name, pattern.description, pattern.video_url, userId]);
      }
  
      // Insert data into the forms table
      for (const form of formsData) {
        await db.query('INSERT INTO forms (name, description, video_url, created_by) VALUES ($1, $2, $3, $4)', [form.name, form.description, form.video_url, userId]);
      }
  
      // Insert data into the weapons table
      for (const weapon of weaponsData) {
        await db.query('INSERT INTO weapons (name, description, img, created_by) VALUES ($1, $2, $3, $4)', [weapon.name, weapon.description, weapon.img, userId]);
      }
  
      await db.query('COMMIT');
      console.log('Sample data inserted successfully');
    } catch (error) {
      await db.query('ROLLBACK');
      console.error('Error inserting sample data:', error);
    } finally {
      db.end();
    }
  }
  
  // Call the function to seed the database
  seedDatabase();