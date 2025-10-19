import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import SEO from '../components/SEO';

// Mock data - trong thực tế sẽ lấy từ API
const newsData: { [key: string]: any } = {
  '1': {
    id: 1,
    title: "Market Trends 2025-2030",
    excerpt: "Competitive Analysis of Alien Technology, Avery Dennison, GAO, HP, IBM, Impinj, Invengo, Omni-ID, RF COde, Zebra Technologies.",
    image: "/products_image/news11.webp",
    middleImage: "/news_image/news1.webp", // Placeholder - thay thế bằng ảnh thực tế
    date: "October 16, 2025",
    author: "Thado Research Team",
    category: "Market",
    readTime: "8 min read",
    content: `
      <h1>The Future of RFID in Data Centers</h1>
      <p>The global RFID market in data centers is experiencing unprecedented growth, driven by the need for efficient asset tracking, enhanced security, and streamlined operations. This comprehensive report analyzes the competitive landscape and emerging trends shaping the industry from 2025 to 2030.</p>
      
      <h2>Market Overview</h2>
      <p>Radio-Frequency Identification (RFID) technology has become an integral part of modern data center infrastructure. As businesses increasingly rely on digital operations, the demand for accurate, real-time asset tracking and management continues to surge.</p>
      
      <h2>Key Players Analysis</h2>
      <p>Leading technology companies including Alien Technology, Avery Dennison, GAO, HP, IBM, Impinj, Invengo, Omni-ID, RF Code, and Zebra Technologies are competing fiercely in this rapidly evolving market. Each brings unique strengths and innovations to the table.</p>
      
      <h3>Alien Technology</h3>
      <p>Known for their high-performance RFID tags and readers, Alien Technology continues to push the boundaries of what's possible in data center environments.</p>
      
      <h3>Impinj</h3>
      <p>Impinj's RAIN RFID platform offers unparalleled connectivity and item intelligence, making it a preferred choice for large-scale data center deployments.</p>
      
      {{MIDDLE_IMAGE}}
      
      <h2>Market Trends 2025-2030</h2>
      
      <p><em>Dublin, Oct. 16, 2025 (GLOBE NEWSWIRE)</em> -- The "Data Center RFID - Global Strategic Business Report" report has been added to ResearchAndMarkets.com's offering.</p>
      
      <p>The global market for Data Center RFID was estimated at <strong>US$2.0 Billion in 2024</strong> and is projected to reach <strong>US$9.0 Billion by 2030</strong>, growing at a CAGR of <strong>28.0%</strong> from 2024 to 2030. This comprehensive report provides an in-depth analysis of market trends, drivers, and forecasts, helping you make informed business decisions.</p>
      
      <h3>Understanding the Technology</h3>
      <p>Data Center Radio Frequency Identification (RFID) technology is revolutionizing the way data centers manage and track their assets, including hardware components like servers, HDDs, and networking equipment. By utilizing wireless communication through radio waves to transfer data, RFID tags attached to data center assets enable automatic identification and tracking, significantly reducing the manual labor associated with asset management.</p>
      
      <h3>What Drives the Growth in the Data Center RFID Market?</h3>
      <p>The growth in the data center RFID market is driven by several factors, including the increasing demand for efficient data center operations and the rising need for accurate asset management solutions. As data centers continue to expand and the volume of assets increases, the efficiency of managing these assets becomes more critical. RFID technology offers a robust solution by enabling precise tracking and management of thousands of assets in real-time.</p>
      
      <p>Additionally, the growing focus on reducing operational costs and enhancing data security further fuels the adoption of RFID systems in data centers. The integration of IoT and smart technologies into data center ecosystems also complements the use of RFID, as these technologies rely on accurate data for analytics and decision-making processes.</p>
      
      <p>Moreover, as companies increasingly prioritize compliance with industry regulations and standards, RFID helps ensure that asset management practices meet these requirements. These technological advancements, along with economic pressures and regulatory demands, collectively propel the expansion of the RFID market in data centers, highlighting its significant role in the future of data center asset management.</p>
      
      <h2>Regional Analysis</h2>
      <p>North America and Europe currently dominate the market, but Asia-Pacific regions are showing remarkable growth rates. The increasing digitalization in emerging markets presents significant opportunities for RFID solution providers.</p>
      
      <h2>Investment Opportunities</h2>
      <p>The report identifies several key investment opportunities for stakeholders looking to capitalize on the growing RFID market in data centers. Strategic partnerships and technological innovations are expected to drive the next wave of growth.</p>
      
      <h2>Conclusion</h2>
      <p>The RFID market in data centers is poised for substantial growth over the next five years. Companies that can offer integrated, secure, and scalable solutions will be well-positioned to capture market share in this dynamic industry.</p>
    `
  },
  '2': {
    id: 2,
    title: "Simplify access control with RXQR RFID and QR scanners",
    excerpt: "Third Millennium introduces RXQR and RXQRK readers, merging high-security RFID card and QR code credentials into a single device for streamlined visitor and contractor management.",
    image: "/products_image/news1.webp",
    middleImage: "/news_image/news2.jpg", // Placeholder - thay thế bằng ảnh thực tế
    date: "October 17, 2025",
    author: "Thado Solutions Team",
    category: "Innovation",
    readTime: "6 min read",
    content: `
      <h1>Third Millennium Introduces RXQR Multi-Technology Readers</h1>
      <p>Third Millennium, known for its innovative access control solutions and a subsidiary of HID, has introduced the <strong>RXQR</strong> and <strong>RXQRK</strong> readers.</p>
      
      <p>These new multi-technology access-control devices merge high-security RFID card and QR code credentials into a single, stylish unit. Designed to streamline the management of visitors and contractors, the RXQR range supports both legacy and modern communication protocols, offering an advanced yet cost-effective solution suitable for contemporary access control requirements.</p>
      
      <h2>Innovative Integration of RFID and QR Technology</h2>
      <p>The RXQR model incorporates high-security RFID card reading capabilities alongside QR code scanning features within a compact device. For organizations requiring an added layer of security, the <strong>RXQRK model</strong> includes a keypad for PIN verification, particularly useful during non-business hours or in high-security settings.</p>
      
      <p>According to <strong>Steve Greenaway</strong>, Business Development Manager at Third Millennium, <em>"QR codes have existed for decades, but their role in access control has accelerated dramatically since the COVID-19 pandemic."</em> He notes the shift towards QR code-based access as a practical, contact-free, and cost-effective entry management solution, particularly as staffed reception areas have become less common.</p>
      
      <h2>Simplifying Access-Control Systems</h2>
      <p>Traditionally, entry points required separate readers for staff RFID cards and visitor QR codes, necessitating dual installations, cabling, and maintenance.</p>
      
      <p>The RXQR range addresses this by integrating both functions into a single reader, connecting via the same door controller ports and supporting <strong>Clock and Data</strong>, <strong>Wiegand</strong>, and <strong>OSDP connectivity standards</strong>.</p>
      
      {{MIDDLE_IMAGE}}
      
      <h2>Compatibility with Modern Access Control Systems</h2>
      <p><em>"It's a simple concept offering huge efficiency and financial gains,"</em> Greenaway comments. By reducing the number of devices and simplifying installation and maintenance processes, substantial cost savings are achieved.</p>
      
      <p>Additionally, RXQR readers support a comprehensive range of high-frequency card technologies, such as <strong>MIFARE® Classic</strong>, <strong>MIFARE® DESFire®</strong>, and <strong>LEGIC</strong>, making them compatible with modern systems utilizing open standard smartcards. DESFire and LEGIC technologies ensure advanced cryptographic security on par with proprietary systems.</p>
      
      <h2>Enhancing Security in Multi-Use Facilities</h2>
      <p>Featuring a keypad for PIN-based two-factor authentication, the RXQRK model is well-suited for multi-tenanted buildings, data centres, and facilities with layered security requirements.</p>
      
      <p>While mobile credentials grow in popularity, QR codes remain a cost-effective and straightforward option for temporary access for contractors and visitors. Greenaway emphasises this advantage, explaining, <em>"Offering temporary access, they're virtually free to issue, disposable and don't require visitors or contractors to download an app or create an account either."</em></p>
      
      <h2>Key Benefits</h2>
      <ul>
        <li><strong>Single Device Solution:</strong> Combines RFID and QR code reading in one unit</li>
        <li><strong>Cost-Effective:</strong> Reduces installation, cabling, and maintenance costs</li>
        <li><strong>Flexible Connectivity:</strong> Supports Clock and Data, Wiegand, and OSDP protocols</li>
        <li><strong>Advanced Security:</strong> Compatible with MIFARE® DESFire®, LEGIC, and other secure technologies</li>
        <li><strong>Two-Factor Authentication:</strong> RXQRK model includes keypad for PIN verification</li>
        <li><strong>Contact-Free Access:</strong> QR codes provide hygienic, touchless entry</li>
        <li><strong>Easy Visitor Management:</strong> QR codes are free, disposable, and require no app downloads</li>
      </ul>
    `
  },
  '3': {
    id: 3,
    title: "Toll collection RFID system",
    excerpt: "Benefits of RFID technology in non-stop toll collection. Making fee collection automatically.",
    image: "/products_image/news2.webp",
    middleImage: "/news_image/news3.png", // Placeholder - thay thế bằng ảnh thực tế
    date: "August 3, 2025",
    author: "Thado Case Study Team",
    category: "Traffic Infrastructure",
    readTime: "10 min read",
    content: `
      <h1>Electronic Toll Collection: Revolutionizing Vietnam's Highway System</h1>
      
      <h2>What is Electronic Toll Collection (ETC)?</h2>
      <p>Electronic Toll Collection (ETC) is a type of automatic toll collection system that uses technology to identify vehicles as they pass through toll stations. The toll fee is automatically deducted from a prepaid account linked to the vehicle. This means that drivers no longer need to stop and pay cash at toll booths. Instead, they can maintain a steady speed while the system identifies their vehicle and deducts the appropriate toll.</p>
      
      <h2>Comparison of ETC and MTC Toll Collection Systems</h2>
      <p>Manual Toll Collection (MTC) is the traditional method of toll collection in Vietnam. With this system, drivers must stop at toll booths to purchase tickets, make payments, and receive receipts. However, this method has presented challenges in management, auditing, and leads to significant time loss. Therefore, the relevant authorities have replaced this method with the Electronic Toll Collection (ETC) system.</p>
      
      <p>In Vietnam, the toll collection system has been transitioning from <strong>MTC (Manual Toll Collection)</strong> to <strong>ETC (Electronic Toll Collection)</strong>, improving efficiency and bringing significant benefits. To clearly see the advantages and disadvantages of each method.</p>
      
      <p>Therefore, the ETC non-stop toll collection system in Vietnam helps reduce waiting times, avoid traffic congestion, and provide optimal convenience for vehicle owners. This method also supports the rapid and accurate development of national traffic data. Additionally, ETC toll collection ensures optimal transparency, avoids potential revenue loss, and minimizes personnel costs as well as paper ticket expenses.</p>
      
      {{MIDDLE_IMAGE}}
      
      <h2>RFID Technology – The Key to Rapid Network Expansion</h2>
      <p>Currently, four common technologies are used for Electronic Toll Collection (ETC) worldwide:</p>
      
      <ul>
        <li><strong>RFID Technology:</strong> RFID stands for Radio Frequency Identification. It uses electromagnetic fields to automatically identify and track tags attached to objects. An RFID system consists of RFID tags, RFID readers, antennas, and computer software.</li>
        <li><strong>DSRC Technology:</strong> Dedicated Short-Range Communications technology.</li>
        <li><strong>ANPR Technology:</strong> Automatic Number Plate Recognition technology.</li>
        <li><strong>GNSS Technology:</strong> Global Navigation Satellite System technology.</li>
      </ul>
      
      <p>Among these, the two most widely used technologies are <strong>DSRC</strong> (used in European Union countries and Singapore) and <strong>RFID</strong> (used in most other countries, including Vietnam).</p>
      
      <h3>RFID Implementation in Vietnam</h3>
      <p>From <strong>0:00 on August 1, 2022</strong>, all expressways in Vietnam transitioned to using electronic toll collection (ETC) services. According to representatives from <strong>VDTC (Vietnam Digital Traffic Joint Stock Company)</strong>, RFID technology is well-suited to the culture and traffic environment in Vietnam due to three advantages:</p>
      
      <ul>
        <li><strong>High accuracy of identification</strong></li>
        <li><strong>Low cost of use</strong></li>
        <li><strong>Ease of deployment and installation</strong></li>
      </ul>
      
      <h2>Benefits of Applying RFID in Automatic Toll Collection</h2>
      <p>The application of RFID technology in ETC automatic toll collection brings many practical benefits to both road users and management units:</p>
      
      <h3>For Road Users:</h3>
      <ul>
        <li><strong>Reduced waiting times:</strong> No need to stop and wait, optimizing travel time and saving fuel, contributing to environmental protection.</li>
        <li><strong>Automated payments:</strong> No need for manual transactions or cash handling.</li>
        <li><strong>Transparent process:</strong> Clear and transparent toll collection process, ensuring optimal protection of user rights.</li>
      </ul>
      
      <h3>For Management Units:</h3>
      <ul>
        <li><strong>Automated process:</strong> Automates the toll collection process, minimizing manpower and reducing operating costs.</li>
        <li><strong>Accurate data recording:</strong> The system automatically records information, minimizing human error and limiting potential losses.</li>
        <li><strong>Efficient data collection:</strong> Collects accurate traffic data to meet management and operational requirements.</li>
        <li><strong>Smart transportation ecosystem:</strong> Contributes to building a smart transportation ecosystem.</li>
      </ul>
      
      <h2>Key Advantages of ETC System</h2>
      <ul>
        <li><strong>Traffic Flow Optimization:</strong> Eliminates bottlenecks at toll stations, reducing congestion significantly</li>
        <li><strong>Cost Efficiency:</strong> Reduces operational costs by minimizing staff requirements and paper ticket expenses</li>
        <li><strong>Environmental Benefits:</strong> Reduces fuel consumption and emissions from idling vehicles</li>
        <li><strong>Data Analytics:</strong> Provides accurate traffic data for better infrastructure planning</li>
        <li><strong>Revenue Protection:</strong> Ensures transparency and prevents potential revenue loss</li>
        <li><strong>User Convenience:</strong> Seamless, contactless payment experience for drivers</li>
      </ul>
    `
  },
  '4': {
    id: 4,
    title: "Leading AI Powered Anti-Counterfeit Software",
    excerpt: "Take back your revenue and soar above your competitors. RFID Anti-Counterfeiting Solutions: How to Secure Your RFID Tags",
    image: "/products_image/news3.webp",
    middleImage: "/news_image/news4.webp", // Placeholder - thay thế bằng ảnh thực tế
    date: "December 28, 2025",
    author: "Thado Security Team",
    category: "Security",
    readTime: "7 min read",
    content: `
      <h1>RFID Anti-Counterfeiting Solutions: How to Secure Your RFID Tags</h1>
      
      <p>Radio Frequency Identification Technology (RFID) is a cost-effective method to track and identify items, applied in a wide range of industries. On a number of occasions, it's also used as an anti-counterfeiting tool, which can prove to be ineffective. This calls for a more secure anti-counterfeiting protocol so that you can combine the two technologies and continue to use RFID.</p>
      
      <p>From helping manufacturers and retailers in tracking supply chains and inventory to pet owners and farmers in finding lost pets and livestock, the small RFID chip is extremely useful. The problem arises when an RFID system is used to protect against counterfeiting. Despite its advantages, RFID is not without its flaws.</p>
      
      <p>With access to advanced technology, counterfeiters can duplicate and clone the RFID chip information, proving the method a failure. Counterfeiting can cost a significant amount of money in losses to brands, ranging in <strong>billions of dollars</strong>. The losses aren't in terms of just lost sales, but also the harm caused to brand reputation and consumer trust.</p>
      
      <p>As RFID technology is widespread in a number of industries, completely removing the system isn't feasible. Instead, brands can secure their existing system by combining it with an anti-counterfeiting technology like <strong>AlpVision's Fingerprint</strong>. This allows companies to still gain the benefits of the technology while making sure the entire process is foolproof.</p>
      
      <h2>Using RFID Tags for Counterfeit Protection</h2>
      <p>RFID tags are used against counterfeiting because of their ability to provide real-time tracking details and their low cost. They are used wherever tracking of movement is required to make sure any tampering isn't happening in the supply chain. Here's an overview of how RFID tags are used in anti-counterfeiting.</p>
      
      <p>RFID tags have the ability to store unique identification data. Hence, genuine products tagged with these chips can be scanned to acquire the data for authentication by consumers and retailers. Next, as they help in tracking the product movements throughout the supply chain, diversions and discrepancies can be identified easily.</p>
      
      <p><strong>The problem is: RFID tags alone can't provide foolproof counterfeit protection.</strong></p>
      
      {{MIDDLE_IMAGE}}
      
      <h2>Risks Associated with RFID Tags Used in Anti-Counterfeiting</h2>
      <p>Here are a few risks associated with using RFID tags in anti-counterfeiting, making them unreliable:</p>
      
      <h3>1. Cloned and Duplicated RFID Tags</h3>
      <p>If the RFID security protocol isn't secured adequately, counterfeiters can easily clone the original tags. RFID tag counterfeiting or "spoofing" is done by duplicating the tag or the data stored inside the chip. Then, the cloned tag is embedded in counterfeit products to sell as genuine products. This process is done carefully so that the users won't be able to identify the difference between the two tags.</p>
      
      <p>A counterfeiter can also tamper with the data inside the tag by either adding or deleting some information. This can disrupt the operations being controlled by the RFID tag.</p>
      
      <p>When RFID tags are used in the pharmaceutical industry, a counterfeiting incident poses a significant health hazard risk. To counter this issue, the <strong>FDA</strong> even suggested <strong>EPC (Electronic Product Code)</strong> in 2003 to protect against counterfeit medicines.</p>
      
      <h3>2. Delay in Detection</h3>
      <p>RFID tags are only effective because of the RFID readers at control points. Taking advantage of the time and distance between two checkpoints, counterfeiters can tamper with the products and tags in transit. By the time the counterfeit product or tag reaches the next control point, it's already too late to identify the counterfeit item or tag. If the fake product manages to bypass the control points and reach the market, identifying the fake product and the culprit is challenging.</p>
      
      <h3>3. Privacy Concerns</h3>
      <p>RFID tags aren't only susceptible to counterfeiting, but also pose as a privacy breach hazard. This is because RFID tags can be read by anyone with an RFID scanner.</p>
      
      <p>If the product tag contains a unique serial number or identification number, it can be easily linked to the customer. This is also known as <strong>"sniffing"</strong>. As the tags don't have enough computing power to accommodate encryption, this can breach the privacy of the consumers. The only exception is the passport chips.</p>
      
      <h2>How to Make RFID Tags Secure</h2>
      <p>Because of the ease of the application and the low cost of RFID tags, it's not feasible to completely stop using them to replace them with something else.</p>
      
      <p>A better solution is to find a complementary security feature that enhances the function of the RFID tag, tackling the limitations of the system. A secure solution is to combine RFID tags with <strong>AlpVision's Fingerprint technology</strong>. Fingerprint is a patent technology that leverages the specific characteristics of the product surface to authenticate it.</p>
      
      <h3>The Hybrid Approach</h3>
      <p>By combining Fingerprint with RFID tags, the tags can still serve as a means of verification and real-time tracking, but the Fingerprint adds an additional layer of authentication. At the point of verification, both Fingerprint and RFID tags can be scanned to fulfill the two functions – tracking and authentication.</p>
      
      <p>This hybrid approach ensures that the genuine product is associated with a unique identity, making it even harder for counterfeiters to operate undetected. <strong>AlpVision's Fingerprint is almost impossible to replicate</strong>, so even if counterfeiters clone the RFID tags, they can't bypass the Fingerprint security feature.</p>
      
      <p><strong>The best part:</strong> Like RFID, Fingerprint can also be used for a wide range of products in different sectors like luxury goods, precious metals, FMCG, and more.</p>
      
      <h2>Key Benefits of the Hybrid Solution</h2>
      <ul>
        <li><strong>Dual-Layer Protection:</strong> Combines RFID tracking with Fingerprint authentication</li>
        <li><strong>Cost-Effective:</strong> Maintains the benefits of RFID while adding security</li>
        <li><strong>Impossible to Clone:</strong> Fingerprint technology cannot be replicated by counterfeiters</li>
        <li><strong>Real-Time Tracking:</strong> RFID continues to provide supply chain visibility</li>
        <li><strong>Brand Protection:</strong> Safeguards brand reputation and consumer trust</li>
        <li><strong>Versatile Application:</strong> Works across multiple industries and product types</li>
        <li><strong>Consumer Safety:</strong> Particularly important for pharmaceuticals and food products</li>
      </ul>
    `
  },
  '5': {
    id: 5,
    title: "RFID in Healthcare: Enhancing Security and Privacy in Healthcare Systems",
    excerpt: "Enhancing Security and Privacy in Healthcare Systems Using a Lightweight RFID Protocol.",
    image: "/products_image/news4.jpg",
    middleImage: "/news_image/news5.jpg", // Placeholder - thay thế bằng ảnh thực tế
    date: "December 20, 2025",
    author: "Thado Innovation Team",
    category: "Healthcare",
    readTime: "9 min read",
    content: `
      <h1>Enhancing Security and Privacy in Healthcare Systems Using a Lightweight RFID Protocol</h1>
      
      <h2>1. Main Contribution</h2>
      <p>The main contribution of this work is the proposal of a <strong>new lightweight authentication approach</strong> for RFID-based systems in the IoT-based healthcare domain. While previous research has tried to develop secure and resilient RFID authentication schemes, vulnerabilities still exist. Therefore, this paper addresses these limitations by introducing an improved authentication scheme that offers enhanced protection compared to existing approaches.</p>
      
      <h2>2. Performance Evaluation</h2>
      <p>Performance evaluation was conducted to assess the efficiency and effectiveness of the proposed protocol compared to state-of-the-art approaches. The evaluation included a <strong>computational cost comparison</strong>, which measured the computational resources required by the protocol. By benchmarking against existing protocols, the performance evaluation demonstrated the <strong>superiority of the proposed protocol in terms of computational efficiency</strong>.</p>
      
      <h2>3. Security Analysis</h2>
      
      <h3>3.1 Formal Verification Using ProVerif</h3>
      <p>For the security analysis, formal verification techniques were employed to ensure the robustness of the proposed protocol against potential security threats. Specifically, the protocol underwent scrutiny using <strong>ProVerif</strong>, which is a widely recognized formal verification tool for security protocol analysis.</p>
      
      <p>Queries were formulated to assess various security properties, such as resistance against event injection and protection against attackers. The responses from ProVerif validated that the proposed protocol satisfied the specified security requirements and could withstand potential security attacks.</p>
      
      <h3>3.2 BAN Logic Analysis</h3>
      <p>In addition to the formal verification technique using ProVerif, this study employed <strong>BAN logic</strong> for conducting a comprehensive security analysis of the proposed lightweight RFID protocol. BAN logic is a formal modelling and analysis technique designed for security protocols. It enables the specification of security properties and the verification of protocol behaviour against those properties.</p>
      
      <p>The proposed protocol was thoroughly examined by leveraging BAN logic to assess its security properties and ensure its resistance against potential attacks. The analysis considered various security aspects, such as:</p>
      
      <ul>
        <li><strong>Tag anonymity</strong></li>
        <li><strong>Replay attack resistance</strong></li>
        <li><strong>Synchronization attack resistance</strong></li>
        <li><strong>Forward secrecy</strong></li>
        <li><strong>Mutual authentication</strong></li>
        <li><strong>Anti-DoS attacks</strong></li>
        <li><strong>Impersonation attacks</strong></li>
        <li><strong>Insider attacks</strong></li>
      </ul>
      
      {{MIDDLE_IMAGE}}
      
      <h3>3.3 Informal Security Analysis</h3>
      <p>Similarly, the informal security analysis compared the proposed scheme with existing protocols, thereby revealing its superiority in meeting all the listed security criteria. The proposed scheme outperformed other protocols, thus demonstrating its effectiveness in ensuring tag anonymity, protection against attacks, mutual authentication, and more.</p>
      
      <p>The rigorous security analysis and comprehensive performance evaluation ensured that the proposed lightweight RFID protocol provided <strong>enhanced security and privacy</strong>, as well as offered <strong>efficient and effective performance</strong>. This holistic approach guaranteed the protocol's suitability for deployment in real-world healthcare systems, where security and performance are critical factors.</p>
      
      <h2>4. Research Summary</h2>
      <p>In summary, this paper aims to enhance the security and privacy of healthcare systems by proposing a lightweight RFID protocol. The proposed protocol addresses existing schemes' <strong>anonymity and traceability issues</strong> by utilizing pseudonyms instead of real IDs and ensuring secure communication between tags and readers.</p>
      
      <p>The protocol has undergone rigorous testing and has been proven to be secure against various security attacks. Furthermore, the paper provides an overview of how RFID technology is used in healthcare systems and highlights the challenges faced by these systems.</p>
      
      <h2>5. Related Work and Gap Analysis</h2>
      
      <h3>5.1 Existing Approaches Review</h3>
      <p>This section reviews the existing approaches related to the authentication and privacy of patients in the <strong>Internet of Healthcare Things (IoHT)</strong>. These approaches mostly investigated RFID-based authentication solutions using:</p>
      
      <ul>
        <li><strong>ECC (Elliptic Curve Cryptography)</strong></li>
        <li><strong>Inbuilt ECC ID verifiers</strong></li>
        <li><strong>PUF (Physical Unclonable Function)</strong></li>
        <li><strong>One-way hash with bitwise exclusive-OR function</strong></li>
        <li><strong>URASP for RFID</strong></li>
      </ul>
      
      <p>These approaches partially overcome the privacy, authentication, and integrity issues from impersonation, loss, replay, and de-synchronization attacks.</p>
      
      <h3>5.2 Key Research Findings</h3>
      <p><strong>Kaul et al.</strong> offered a privacy-preserving and efficient authentication protocol (RFID) for healthcare systems using pseudonyms instead of real IDs.</p>
      
      <p><strong>Chou et al.</strong> proposed an RFID-based authentication using ECC. However, Zhang et al. found the scheme unsafe against impersonation attacks with no forward security.</p>
      
      <p><strong>Liao et al.</strong> proposed a secured RFID system with an inbuilt ECC ID verifier protocol. However, it was insecure if an adversary revealed the secret key of a tag.</p>
      
      <p><strong>Zhao et al.</strong> presented a secure RFID system with ECC. However, Farash et al. realized that the proposed scheme did not preserve any forward secrecy.</p>
      
      <p><strong>Srivastava et al.</strong> proposed a mutual authentication protocol using synchronized shared secret, one-way hash function, and bitwise exclusive-OR function. However, Li et al. revealed a severe security flaw where an attacker can use a stolen RFID reader.</p>
      
      <p><strong>Jin et al.</strong> proposed an RFID system using ECC for medication environments. However, Pokala et al. pointed out vulnerabilities to impersonation attacks.</p>
      
      <p><strong>Chen et al.</strong> cryptanalyzed protocols by Fan et al. and Benssalah et al., demonstrating their susceptibility to tracking, reader, and tag impersonation attacks.</p>
      
      <h3>5.3 Identified Gaps</h3>
      <p>As discussed above, most of the literature offers privacy-preserving and efficient authentication approaches. However, these approaches still have challenges that include:</p>
      
      <ul>
        <li><strong>Forward secrecy issues</strong></li>
        <li><strong>Revelation of secret key vulnerabilities</strong></li>
        <li><strong>Lack of mutual authentication</strong></li>
        <li><strong>Tag identity maintenance challenges</strong></li>
        <li><strong>Data integrity issues in mobile RFID scenarios</strong></li>
        <li><strong>Tag anonymity and traceability problems</strong></li>
      </ul>
      
      <h2>6. Proposed Solution</h2>
      <p>Our proposed scheme differs from the state-of-the-art approaches, as it employs <strong>lightweight operations</strong> and requires <strong>fewer computing resources</strong>. The scheme uses a combination of <strong>symmetric key encryption</strong> and <strong>hash functions</strong> to protect patient privacy while ensuring secure communication between tags and readers.</p>
      
      <p>By introducing this novel lightweight RFID protocol and conducting a thorough evaluation using formal verification techniques, this study contributes to the advancement of secure RFID protocols for IoT-based healthcare systems. The proposed protocol aims to address the security and privacy concerns associated with RFID-based healthcare systems, thereby ultimately ensuring <strong>better patient care and safety</strong>.</p>
      
      <h2>Key Advantages of the Proposed Protocol</h2>
      <ul>
        <li><strong>Lightweight Operations:</strong> Requires fewer computing resources than existing protocols</li>
        <li><strong>Enhanced Privacy:</strong> Uses pseudonyms instead of real IDs to protect patient privacy</li>
        <li><strong>Comprehensive Security:</strong> Resistant to all major attack vectors including DoS, replay, and impersonation</li>
        <li><strong>Formal Verification:</strong> Validated using ProVerif and BAN logic</li>
        <li><strong>Computational Efficiency:</strong> Lower computational cost compared to existing ECC-based approaches</li>
        <li><strong>Mutual Authentication:</strong> Ensures secure communication between tags, readers, and servers</li>
        <li><strong>Real-World Applicability:</strong> Suitable for deployment in actual healthcare environments</li>
      </ul>
    `
  },
  '6': {
    id: 6,
    title: "RFID closes the gap between retail, logistics",
    excerpt: "RFID bridges the gap between retail and logistics by giving both sides a single, real-time view of what's happening across the value chain.",
    image: "/products_image/news5.jpg",
    middleImage: "/news_image/news6.webp", // Placeholder - thay thế bằng ảnh thực tế
    date: "December 15, 2025",
    author: "Thado Product Team",
    category: "Logistics",
    readTime: "5 min read",
    content: `
      <h1>RFID Closes the Gap Between Retail and Logistics</h1>
      
      <p><em>"RFID bridges the gap between retail and logistics by giving both sides a single, real-time view of what's happening across the value chain,"</em> says <strong>Stef du Plessis</strong>, Managing Director at Osiris Technical Systems. <em>"It's not just about tracking stock, it's about enabling better decisions, faster response times and more resilient operations."</em></p>
      
      <p>For example, because RFID tags do not require line of sight between the reader and the tag like a barcode does, a manual and time-consuming monthly stock take can be replaced with a quick daily scan of inventory.</p>
      
      <h2>Real-Time Visibility Replaces Guesswork</h2>
      <p>In many organisations, stock information is fragmented across separate systems – warehouse management, point-of-sale, transport and e-commerce platforms. This lack of integration leads to blind spots, stockouts, overstocking and inefficiencies.</p>
      
      <p>RFID creates a <strong>shared data layer</strong> across the entire operation. Each item tagged at production can be automatically read at every stage – from factory to warehouse to store – without manual scanning.</p>
      
      <p><strong>The result is continuous, accurate visibility.</strong></p>
      
      <ul>
        <li><strong>Retailers</strong> can trigger replenishment before shelves run empty.</li>
        <li><strong>Warehouses</strong> can redirect slow-moving stock to higher-demand areas.</li>
        <li><strong>Logistics teams</strong> can optimise routing and turnaround times.</li>
      </ul>
      
      <p>When decisions are based on real-time data rather than assumptions, the entire supply chain moves faster and performs better.</p>
      
      {{MIDDLE_IMAGE}}
      
      <h2>Reducing Waste and Improving Margins</h2>
      <p>Beyond visibility, RFID helps reduce waste, lower labour costs and improve forecasting. Retailers using RFID across their networks report <strong>double-digit reductions in out-of-stock incidents</strong> and more accurate demand planning.</p>
      
      <p>By preventing overstocking and unnecessary markdowns, RFID protects margins while maintaining product availability – a direct benefit for both customer satisfaction and profitability.</p>
      
      <p><em>"When your data is accurate and up to date, your business can move faster and smarter,"</em> adds Du Plessis. <em>"RFID helps teams act in real-time, rather than react after the fact."</em></p>
      
      <h2>Laying the Foundation for AI-Driven Operations</h2>
      <p>RFID is also becoming the foundation for next-generation smart logistics. Integrated with <strong>artificial intelligence (AI)</strong>, the <strong>internet of things (IoT)</strong> and <strong>predictive analytics</strong>, RFID enables dynamic and automated decision-making.</p>
      
      <p>Warehouses can automatically reroute shipments based on RFID data, while store shelves can trigger replenishment when inventory runs low. This convergence of automation and intelligence transforms retail and logistics from cost centres into <strong>growth engines</strong>.</p>
      
      <h2>Partnering for Practical Innovation</h2>
      <p><strong>Osiris Technical Systems</strong> provides the full RFID ecosystem: from tags, readers and antennae to data platforms and systems integration. The company designs tailored solutions for each client's environment, ensuring seamless implementation across retail, logistics, warehousing and industrial operations.</p>
      
      <p><em>"Our mission is to help businesses turn visibility into value,"</em> says Du Plessis. <em>"RFID is the bridge to that future, and it starts with the right partner."</em></p>
      
      <h2>Key Benefits of RFID Integration</h2>
      <ul>
        <li><strong>Real-Time Visibility:</strong> Continuous, accurate view across the entire value chain</li>
        <li><strong>Faster Stock Takes:</strong> Replace monthly manual counts with quick daily scans</li>
        <li><strong>No Line of Sight Required:</strong> Unlike barcodes, RFID works without direct visibility</li>
        <li><strong>Reduced Out-of-Stock:</strong> Double-digit reductions in stockout incidents</li>
        <li><strong>Better Margins:</strong> Prevent overstocking and unnecessary markdowns</li>
        <li><strong>Lower Labour Costs:</strong> Automate manual scanning and tracking processes</li>
        <li><strong>Improved Forecasting:</strong> Accurate demand planning based on real data</li>
        <li><strong>AI-Ready Infrastructure:</strong> Foundation for smart, automated decision-making</li>
        <li><strong>Optimised Routing:</strong> Better logistics planning and turnaround times</li>
        <li><strong>Growth Engine:</strong> Transform operations from cost centres to revenue drivers</li>
      </ul>
    `
  }
};

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const news = id ? newsData[id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!news) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">News Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link
            to="/thado-news"
            className="inline-block bg-[#36A9A9] text-white px-6 py-3 rounded-lg hover:bg-[#2a8a8a] transition-colors duration-300"
          >
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  // Get 3 random related news (excluding current article)
  const relatedNews = Object.values(newsData)
    .filter((item: any) => item.id !== news.id)
    .sort(() => Math.random() - 0.5) // Shuffle randomly
    .slice(0, 3);

  return (
    <>
      <SEO
        title={`${news.title} - Thado News`}
        description={news.excerpt}
        keywords={`${news.category}, RFID, technology, ${news.title}`}
        image={`https://rfid.thadorobot.com${news.image}`}
        url={`/thado-news/${news.id}`}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Top Background Hero - Same height as navbar */}
        <div className="relative h-16 lg:h-20 xl:h-24 3xl:h-28 bg-gradient-to-r from-[#36A9A9] to-[#2a8a8a]">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Header Section with Title and Meta */}
        <div className="bg-white border-b border-gray-200 pt-8 lg:pt-10 xl:pt-12 pb-6 lg:pb-8">
          <div className="container-responsive">
            {/* Breadcrumb */}
            <AnimatedSection animationType="fadeInUp" delay={0}>
              <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6 lg:mb-8">
                <Link to="/" className="hover:text-[#36A9A9] transition-colors duration-200">Home</Link>
                <span>/</span>
                <Link to="/thado-news" className="hover:text-[#36A9A9] transition-colors duration-200">News</Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">{news.category}</span>
              </nav>
            </AnimatedSection>

            {/* Category Badge */}
            <AnimatedSection animationType="fadeInUp" delay={100}>
              <div className="inline-block bg-[#36A9A9] text-white px-3 py-1 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium mb-4 lg:mb-6">
                {news.category}
              </div>
            </AnimatedSection>

            {/* Title */}
            <AnimatedSection animationType="fadeInUp" delay={200}>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 3xl:text-6xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
                {news.title}
              </h1>
            </AnimatedSection>

            {/* Meta Info */}
            <AnimatedSection animationType="fadeInUp" delay={300}>
              <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-sm lg:text-base text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#36A9A9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{news.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#36A9A9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{news.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#36A9A9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{news.readTime}</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-8 lg:py-12 xl:py-16 3xl:py-20">
          <div className="container-responsive">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16">
              {/* Article Content */}
              <div className="lg:col-span-8">
                {/* Featured Image */}
                <AnimatedSection animationType="fadeInUp" delay={300}>
                  <div className="w-full rounded-xl overflow-hidden shadow-lg mb-6 lg:mb-8 xl:mb-10">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </AnimatedSection>

                <AnimatedSection animationType="fadeInUp" delay={400}>
                  <article className="bg-white rounded-xl shadow-lg p-6 lg:p-8 xl:p-12 3xl:p-16">
                    {/* Excerpt */}
                    <div className="bg-gray-50 border-l-4 border-[#36A9A9] p-4 lg:p-6 mb-6 lg:mb-8">
                      <p className="text-base lg:text-lg xl:text-xl text-gray-700 italic leading-relaxed">
                        {news.excerpt}
                      </p>
                    </div>

                    {/* Article Body with Middle Image */}
                    <div 
                      className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none
                        prose-headings:text-gray-900 prose-headings:font-bold
                        prose-h1:text-2xl prose-h1:lg:text-3xl prose-h1:xl:text-4xl prose-h1:mb-6 prose-h1:mt-8 prose-h1:pb-3 prose-h1:border-b prose-h1:border-gray-200
                        prose-h2:text-xl prose-h2:lg:text-2xl prose-h2:mb-4 prose-h2:mt-6
                        prose-h3:text-lg prose-h3:lg:text-xl prose-h3:mb-3 prose-h3:mt-4
                        prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
                        prose-ul:my-4 prose-li:text-gray-600 prose-li:mb-2
                        prose-strong:text-gray-900 prose-strong:font-semibold
                        prose-a:text-[#36A9A9] prose-a:no-underline hover:prose-a:underline"
                      dangerouslySetInnerHTML={{ 
                        __html: news.content.replace(
                          '{{MIDDLE_IMAGE}}',
                          news.middleImage 
                            ? `<div class="my-6 lg:my-8 xl:my-10 not-prose">
                                <div class="w-full rounded-xl overflow-hidden shadow-lg">
                                  <img 
                                    src="${news.middleImage}" 
                                    alt="${news.title} - Hình ảnh minh họa"
                                    class="w-full h-auto object-cover"
                                    onerror="this.style.display='none'"
                                  />
                                </div>
                              </div>`
                            : ''
                        )
                      }}
                    />

                    {/* Share Section */}
                    <div className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-gray-200">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <h3 className="text-lg lg:text-xl font-semibold text-gray-900">Share this article</h3>
                        <div className="flex items-center gap-3">
                          <button className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                          </button>
                          <button className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors duration-300">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                          </button>
                          <button className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors duration-300">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </button>
                          <button className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Navigation to Previous/Next Article */}
                    <div className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-gray-200">
                      <div className="flex flex-col sm:flex-row gap-4 justify-between">
                        {parseInt(id!) > 1 && (
                          <button
                            onClick={() => navigate(`/thado-news/${parseInt(id!) - 1}`)}
                            className="flex items-center gap-2 text-[#36A9A9] hover:text-[#2a8a8a] transition-colors duration-300 group"
                          >
                            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="font-medium">Previous Article</span>
                          </button>
                        )}
                        {parseInt(id!) < Object.keys(newsData).length && (
                          <button
                            onClick={() => navigate(`/thado-news/${parseInt(id!) + 1}`)}
                            className="flex items-center gap-2 text-[#36A9A9] hover:text-[#2a8a8a] transition-colors duration-300 group ml-auto"
                          >
                            <span className="font-medium">Next Article</span>
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                </AnimatedSection>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4">
                {/* Related Articles */}
                <AnimatedSection animationType="fadeInUp" delay={500}>
                  <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 mb-6 lg:mb-8">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Related Articles</h3>
                    <div className="space-y-4 lg:space-y-6">
                      {relatedNews.map((item: any) => (
                        <Link
                          key={item.id}
                          to={`/thado-news/${item.id}`}
                          className="block group"
                        >
                          <div className="flex gap-4">
                            <div className="flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden relative">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="inline-block bg-[#36A9A9]/10 text-[#36A9A9] px-2 py-0.5 rounded text-xs font-medium mb-1">
                                {item.category}
                              </span>
                              <h4 className="text-sm lg:text-base font-semibold text-gray-900 group-hover:text-[#36A9A9] transition-colors duration-300 line-clamp-2 mb-1">
                                {item.title}
                              </h4>
                              <p className="text-xs text-gray-500">{item.date}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>

                {/* Newsletter Signup */}
                <AnimatedSection animationType="fadeInUp" delay={600}>
                  <div className="bg-gradient-to-br from-[#36A9A9] to-[#2a8a8a] rounded-xl shadow-lg p-6 lg:p-8 text-white">
                    <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">Subscribe to Newsletter</h3>
                    <p className="text-sm lg:text-base text-white/90 mb-4 lg:mb-6">
                      Get the latest RFID news and insights delivered to your inbox.
                    </p>
                    <form className="space-y-3">
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white text-sm lg:text-base"
                      />
                      <button
                        type="submit"
                        className="w-full bg-white text-[#36A9A9] px-4 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 text-sm lg:text-base"
                      >
                        Subscribe Now
                      </button>
                    </form>
                  </div>
                </AnimatedSection>

                {/* Back to News Button */}
                <AnimatedSection animationType="fadeInUp" delay={700}>
                  <Link
                    to="/thado-news"
                    className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-4 rounded-xl font-semibold text-center transition-all duration-300 mt-6 lg:mt-8"
                  >
                    ← Back to All News
                  </Link>
                </AnimatedSection>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsDetail;
