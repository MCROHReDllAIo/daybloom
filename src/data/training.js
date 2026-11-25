export const CATEGORY_COLORS = {
  university: '#DCCCF3',
  work: '#F4DDE8',
  studying: '#FFF1D6',
  personal: '#D9EBDD',
  training: '#B8D4F0',
  sleep: '#E8E4F0',
  free: '#F0F0F0',
}

export const trainingCategories = [
  {
    id: 'office',
    icon: 'FileSpreadsheet',
    color: '#DCCCF3',
    difficulty: 'beginner',
    duration: 45,
    title: { en: 'Microsoft Office Skills', ar: 'مهارات مايكروسوفت أوفيس' },
    description: {
      en: 'Master Word, Excel, and PowerPoint for professional documents, spreadsheets, and presentations.',
      ar: 'أتقن Word و Excel و PowerPoint للمستندات والجداول والعروض الاحترافية.',
    },
    objectives: {
      en: [
        'Create professional Word documents',
        'Build Excel spreadsheets and formulas',
        'Design clear PowerPoint presentations',
      ],
      ar: [
        'إنشاء مستندات Word احترافية',
        'بناء جداول Excel والصيغ',
        'تصميم عروض PowerPoint واضحة',
      ],
    },
    topics: {
      en: ['Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint', 'Professional documents', 'Presentations', 'Spreadsheets'],
      ar: ['مايكروسوفت وورد', 'مايكروسوفت إكسل', 'مايكروسوفت باوربوينت', 'مستندات احترافية', 'عروض تقديمية', 'جداول بيانات'],
    },
    levels: {
      beginner: {
        duration: 15,
        intro: {
          en: 'Learn the essentials of Microsoft Office to handle everyday student and workplace tasks.',
          ar: 'تعلّم أساسيات مايكروسوفت أوفيس للمهام اليومية للطالب والعمل.',
        },
        lessons: {
          en: [
            { title: 'Word Basics', content: 'Create a new document, apply fonts and headings, insert headers/footers, and export to PDF.' },
            { title: 'Excel Basics', content: 'Enter data in cells, use SUM and AVERAGE, sort columns, and format tables.' },
            { title: 'PowerPoint Basics', content: 'Choose a theme, add slides, insert images, and use simple transitions.' },
          ],
          ar: [
            { title: 'أساسيات وورد', content: 'أنشئ مستنداً جديداً، طبّق الخطوط والعناوين، أدرج ترويسة/تذييل، وصدّر إلى PDF.' },
            { title: 'أساسيات إكسل', content: 'أدخل البيانات، استخدم SUM و AVERAGE، رتّب الأعمدة، ونسّق الجداول.' },
            { title: 'أساسيات باوربوينت', content: 'اختر قالباً، أضف شرائح، أدرج صوراً، واستخدم انتقالات بسيطة.' },
          ],
        },
        examples: {
          en: ['Write a one-page assignment cover sheet in Word.', 'Build a weekly budget sheet in Excel.', 'Make a 5-slide topic presentation.'],
          ar: ['اكتب صفحة غلاف للواجب في وورد.', 'ابنِ جدول ميزانية أسبوعي في إكسل.', 'أنشئ عرضاً من 5 شرائح.'],
        },
        activity: {
          en: { prompt: 'List 3 Excel formulas useful for student grades.', placeholder: 'e.g. AVERAGE, SUM, IF...' },
          ar: { prompt: 'اذكر 3 صيغ Excel مفيدة لدرجات الطلاب.', placeholder: 'مثل AVERAGE و SUM و IF...' },
        },
        quiz: [
          {
            q: { en: 'Which Office app is best for calculating averages?', ar: 'أي تطبيق أوفيس الأفضل لحساب المتوسطات؟' },
            options: { en: ['Word', 'Excel', 'PowerPoint', 'Outlook'], ar: ['وورد', 'إكسل', 'باوربوينت', 'أوتلوك'] },
            answer: 1,
          },
          {
            q: { en: 'What does Ctrl+S usually do?', ar: 'ماذا يفعل عادة Ctrl+S؟' },
            options: { en: ['Save', 'Share', 'Sort', 'Spell check'], ar: ['حفظ', 'مشاركة', 'فرز', 'تدقيق إملائي'] },
            answer: 0,
          },
        ],
      },
      intermediate: {
        duration: 30,
        intro: {
          en: 'Go deeper with formatting, charts, and presentation storytelling.',
          ar: 'تعمّق في التنسيق والرسوم البيانية وسرد العروض.',
        },
        lessons: {
          en: [
            { title: 'Styles & Templates', content: 'Use Word styles for consistent academic formatting and citations layout.' },
            { title: 'Charts & Pivot Basics', content: 'Create bar/line charts and summarize data with PivotTables.' },
            { title: 'Slide Design', content: 'Apply visual hierarchy, limit text, and align objects for clarity.' },
          ],
          ar: [
            { title: 'الأنماط والقوالب', content: 'استخدم أنماط وورد لتنسيق أكاديمي متسق.' },
            { title: 'الرسوم والجداول المحورية', content: 'أنشئ رسوماً بيانية ولخّص البيانات بالجداول المحورية.' },
            { title: 'تصميم الشرائح', content: 'طبّق التسلسل البصري وقلّل النص وحاذِ العناصر.' },
          ],
        },
        examples: {
          en: ['Format a research report with Heading 1/2 styles.', 'Chart attendance data for a class.'],
          ar: ['نسّق تقريراً بحثياً بأنماط Heading.', 'ارسم بيانات الحضور لصف دراسي.'],
        },
        activity: {
          en: { prompt: 'Describe when you would use a PivotTable.', placeholder: 'Your answer...' },
          ar: { prompt: 'صف متى تستخدم الجدول المحوري.', placeholder: 'إجابتك...' },
        },
        quiz: [
          {
            q: { en: 'PivotTables are mainly used to…', ar: 'الجداول المحورية تُستخدم أساساً لـ…' },
            options: { en: ['Draw images', 'Summarize data', 'Write essays', 'Send email'], ar: ['رسم صور', 'تلخيص البيانات', 'كتابة مقالات', 'إرسال بريد'] },
            answer: 1,
          },
        ],
      },
      advanced: {
        duration: 60,
        intro: {
          en: 'Build a mini project combining Word, Excel, and PowerPoint.',
          ar: 'ابنِ مشروعاً مصغراً يجمع وورد وإكسل وباوربوينت.',
        },
        lessons: {
          en: [
            { title: 'Integrated Workflow', content: 'Export Excel charts into PowerPoint and link data updates.' },
            { title: 'Automation Tips', content: 'Use Find/Replace, Quick Parts, and named ranges to work faster.' },
          ],
          ar: [
            { title: 'سير عمل متكامل', content: 'صدّر رسوم إكسل إلى باوربوينت واربط تحديثات البيانات.' },
            { title: 'نصائح الأتمتة', content: 'استخدم البحث/الاستبدال والأجزاء السريعة والنطاقات المسماة.' },
          ],
        },
        examples: {
          en: ['Create a student project report pack: data sheet + slides + summary doc.'],
          ar: ['أنشئ حزمة تقرير طالب: ورقة بيانات + شرائح + ملخص.'],
        },
        activity: {
          en: { prompt: 'Outline a 3-step Office workflow for a group project.', placeholder: 'Step 1...' },
          ar: { prompt: 'اختصر سير عمل أوفيس من 3 خطوات لمشروع جماعي.', placeholder: 'الخطوة 1...' },
        },
        quiz: [
          {
            q: { en: 'Best tool to visualize trends over months?', ar: 'أفضل أداة لتصور الاتجاهات عبر الأشهر؟' },
            options: { en: ['Word table only', 'Excel chart', 'Sticky notes', 'Calculator'], ar: ['جدول وورد فقط', 'رسم إكسل', 'ملاحظات لاصقة', 'آلة حاسبة'] },
            answer: 1,
          },
        ],
      },
    },
  },
  {
    id: 'google',
    icon: 'Cloud',
    color: '#F4DDE8',
    difficulty: 'beginner',
    duration: 40,
    title: { en: 'Google Workspace Skills', ar: 'مهارات Google Workspace' },
    description: {
      en: 'Collaborate with Docs, Sheets, Slides, Drive, and Forms in the cloud.',
      ar: 'تعاون عبر Docs و Sheets و Slides و Drive و Forms في السحابة.',
    },
    objectives: {
      en: ['Collaborate in real time', 'Organize files in Drive', 'Build Forms for surveys'],
      ar: ['التعاون الفوري', 'تنظيم الملفات في Drive', 'بناء نماذج للاستبيانات'],
    },
    topics: {
      en: ['Google Docs', 'Google Sheets', 'Google Slides', 'Google Drive', 'Google Forms'],
      ar: ['مستندات جوجل', 'جداول جوجل', 'شرائح جوجل', 'جوجل درايف', 'نماذج جوجل'],
    },
    levels: {
      beginner: {
        duration: 15,
        intro: { en: 'Get comfortable sharing and editing cloud documents.', ar: 'تعرّف على مشاركة وتحرير المستندات السحابية.' },
        lessons: {
          en: [
            { title: 'Docs Collaboration', content: 'Share with view/comment/edit permissions and leave comments.' },
            { title: 'Drive Folders', content: 'Create folder structure for courses and assignments.' },
            { title: 'Forms Basics', content: 'Build a simple quiz or attendance form.' },
          ],
          ar: [
            { title: 'التعاون في Docs', content: 'شارك بصلاحيات عرض/تعليق/تعديل واترك تعليقات.' },
            { title: 'مجلدات Drive', content: 'أنشئ هيكل مجلدات للمواد والواجبات.' },
            { title: 'أساسيات Forms', content: 'ابنِ نموذجاً بسيطاً لاختبار أو حضور.' },
          ],
        },
        examples: {
          en: ['Share a group project Doc with edit access.', 'Create a Drive folder per course.'],
          ar: ['شارك مستند مشروع جماعي بصلاحية تعديل.', 'أنشئ مجلد Drive لكل مادة.'],
        },
        activity: {
          en: { prompt: 'Name 3 permission levels in Google Drive sharing.', placeholder: 'Viewer, Commenter...' },
          ar: { prompt: 'اذكر 3 مستويات صلاحيات في مشاركة Drive.', placeholder: 'عارض، معلّق...' },
        },
        quiz: [
          {
            q: { en: 'Where do Google Docs files primarily live?', ar: 'أين تعيش ملفات Docs أساساً؟' },
            options: { en: ['USB only', 'Google Drive', 'Desktop wallpaper', 'Email draft'], ar: ['USB فقط', 'Google Drive', 'خلفية سطح المكتب', 'مسودة بريد'] },
            answer: 1,
          },
        ],
      },
      intermediate: {
        duration: 30,
        intro: { en: 'Use Sheets formulas and Forms response sheets effectively.', ar: 'استخدم صيغ Sheets وجداول ردود Forms بفعالية.' },
        lessons: {
          en: [
            { title: 'Sheets Formulas', content: 'Use FILTER, QUERY basics, and conditional formatting.' },
            { title: 'Forms to Sheets', content: 'Link form responses and analyze results.' },
          ],
          ar: [
            { title: 'صيغ Sheets', content: 'استخدم FILTER وأساسيات QUERY والتنسيق الشرطي.' },
            { title: 'من Forms إلى Sheets', content: 'اربط ردود النموذج وحلّل النتائج.' },
          ],
        },
        examples: { en: ['Build a peer-feedback Form linked to a Sheet.'], ar: ['ابنِ نموذج تغذية راجعة مرتبط بورقة.' ] },
        activity: {
          en: { prompt: 'When should you use Commenter vs Editor?', placeholder: 'Your answer...' },
          ar: { prompt: 'متى تستخدم معلّق مقابل محرّر؟', placeholder: 'إجابتك...' },
        },
        quiz: [
          {
            q: { en: 'Google Forms responses are often stored in…', ar: 'ردود Google Forms غالباً تُخزَّن في…' },
            options: { en: ['Sheets', 'Paint', 'Calendar only', 'Maps'], ar: ['Sheets', 'Paint', 'التقويم فقط', 'Maps'] },
            answer: 0,
          },
        ],
      },
      advanced: {
        duration: 55,
        intro: { en: 'Design a full collaboration workflow for a student team.', ar: 'صمّم سير تعاون كامل لفريق طلابي.' },
        lessons: {
          en: [
            { title: 'Version History', content: 'Restore previous versions and name milestones.' },
            { title: 'Shared Drives Tips', content: 'Organize ownership so projects survive member changes.' },
          ],
          ar: [
            { title: 'سجل الإصدارات', content: 'استعد إصدارات سابقة وسمِّ المعالم.' },
            { title: 'نصائح المساحات المشتركة', content: 'نظّم الملكية حتى تستمر المشاريع عند تغيّر الأعضاء.' },
          ],
        },
        examples: { en: ['Set up a team Drive + Docs + Form intake for a club.'], ar: ['أعدّ Drive جماعي + Docs + نموذج استقبال لنادي.' ] },
        activity: {
          en: { prompt: 'Write a folder naming convention for your courses.', placeholder: 'YYYY-Course-...' },
          ar: { prompt: 'اكتب اتفاقية تسمية مجلدات لموادك.', placeholder: 'YYYY-المادة-...' },
        },
        quiz: [
          {
            q: { en: 'Version history helps you…', ar: 'سجل الإصدارات يساعدك على…' },
            options: { en: ['Recover past edits', 'Delete Drive', 'Hide Wi‑Fi', 'Change CPU'], ar: ['استعادة تعديلات سابقة', 'حذف Drive', 'إخفاء Wi‑Fi', 'تغيير المعالج'] },
            answer: 0,
          },
        ],
      },
    },
  },
  {
    id: 'ai',
    icon: 'Sparkles',
    color: '#FFF1D6',
    difficulty: 'beginner',
    duration: 35,
    title: { en: 'AI Tools and Digital Productivity', ar: 'أدوات الذكاء الاصطناعي والإنتاجية الرقمية' },
    description: {
      en: 'Use AI wisely for studying, prompting, brainstorming, and verifying information.',
      ar: 'استخدم الذكاء الاصطناعي بحكمة للدراسة والطلبات والعصف الذهني والتحقق من المعلومات.',
    },
    objectives: {
      en: ['Write effective prompts', 'Use AI for studying', 'Verify AI output'],
      ar: ['كتابة طلبات فعّالة', 'استخدام AI للدراسة', 'التحقق من مخرجات AI'],
    },
    topics: {
      en: ['Understanding AI tools', 'Effective prompts', 'AI for studying', 'Brainstorming', 'Productivity', 'Checking AI information'],
      ar: ['فهم أدوات AI', 'الطلبات الفعّالة', 'AI للدراسة', 'العصف الذهني', 'الإنتاجية', 'التحقق من معلومات AI'],
    },
    levels: {
      beginner: {
        duration: 15,
        intro: { en: 'Understand what AI can and cannot do for students.', ar: 'افهم ما يستطيع الذكاء الاصطناعي فعله وما لا يستطيع للطالب.' },
        lessons: {
          en: [
            { title: 'AI Basics', content: 'AI predicts text; it can err. Always verify facts and cite sources.' },
            { title: 'Prompt Structure', content: 'Role + task + context + format = clearer answers.' },
            { title: 'Study Use Cases', content: 'Summarize notes, quiz yourself, explain concepts simply.' },
          ],
          ar: [
            { title: 'أساسيات AI', content: 'الذكاء الاصطناعي يتنبأ بالنص وقد يخطئ. تحقق دائماً واستشهد بالمصادر.' },
            { title: 'بنية الطلب', content: 'الدور + المهمة + السياق + الصيغة = إجابات أوضح.' },
            { title: 'حالات الدراسة', content: 'لخّص الملاحظات، اختبر نفسك، اشرح المفاهيم ببساطة.' },
          ],
        },
        examples: {
          en: ['Prompt: “Explain photosynthesis like I’m 15, in 5 bullets.”'],
          ar: ['طلب: "اشرح البناء الضوئي كأني في 15 سنة، في 5 نقاط."'],
        },
        activity: {
          en: { prompt: 'Write a prompt to generate 5 practice quiz questions on any topic.', placeholder: 'Act as a tutor...' },
          ar: { prompt: 'اكتب طلباً لإنشاء 5 أسئلة تدريب حول أي موضوع.', placeholder: 'تصرف كمعلّم...' },
        },
        quiz: [
          {
            q: { en: 'A good habit with AI answers is to…', ar: 'عادة جيدة مع إجابات AI هي…' },
            options: { en: ['Never check sources', 'Verify important facts', 'Share passwords', 'Skip citations'], ar: ['عدم التحقق أبداً', 'التحقق من الحقائق المهمة', 'مشاركة كلمات المرور', 'تجاهل الاستشهاد'] },
            answer: 1,
          },
        ],
      },
      intermediate: {
        duration: 30,
        intro: { en: 'Improve prompts and use AI for planning and brainstorming.', ar: 'حسّن الطلبات واستخدم AI للتخطيط والعصف الذهني.' },
        lessons: {
          en: [
            { title: 'Iterative Prompting', content: 'Refine answers by asking for revisions, constraints, and examples.' },
            { title: 'Productivity', content: 'Draft outlines, meeting agendas, and study schedules with AI.' },
          ],
          ar: [
            { title: 'الطلب التكراري', content: 'حسّن الإجابات بطلب مراجعات وقيود وأمثلة.' },
            { title: 'الإنتاجية', content: 'اصنع مخططات وجداول دراسة بمساعدة AI.' },
          ],
        },
        examples: { en: ['Ask AI to critique your essay outline for gaps.'], ar: ['اطلب من AI نقد مخطط مقالتك بحثاً عن فجوات.'] },
        activity: {
          en: { prompt: 'Improve this prompt: “Tell me about history.”', placeholder: 'Make it specific...' },
          ar: { prompt: 'حسّن هذا الطلب: "أخبرني عن التاريخ."', placeholder: 'اجعله محدداً...' },
        },
        quiz: [
          {
            q: { en: 'Iterative prompting means…', ar: 'الطلب التكراري يعني…' },
            options: { en: ['One vague ask', 'Refining with follow-ups', 'Ignoring context', 'Copying blindly'], ar: ['طلب غامض واحد', 'التحسين بمتابعات', 'تجاهل السياق', 'نسخ أعمى'] },
            answer: 1,
          },
        ],
      },
      advanced: {
        duration: 50,
        intro: { en: 'Build an AI-assisted study system with verification steps.', ar: 'ابنِ نظام دراسة بمساعدة AI مع خطوات تحقق.' },
        lessons: {
          en: [
            { title: 'Verification Workflow', content: 'Cross-check claims with course materials and reliable sites.' },
            { title: 'Ethics', content: 'Disclose AI use when required; never submit unverified work as your own.' },
          ],
          ar: [
            { title: 'سير التحقق', content: 'قارن الادعاءات بمواد المقرر والمواقع الموثوقة.' },
            { title: 'الأخلاقيات', content: 'أفصح عن استخدام AI عند الطلب؛ لا تقدّم عملاً غير موثّق كأنه لك.' },
          ],
        },
        examples: { en: ['Create a study plan + flashcards + verification checklist.'], ar: ['أنشئ خطة دراسة + بطاقات + قائمة تحقق.'] },
        activity: {
          en: { prompt: 'List 3 ways to verify an AI-generated fact.', placeholder: '1...' },
          ar: { prompt: 'اذكر 3 طرق للتحقق من حقيقة أنتجها AI.', placeholder: '1...' },
        },
        quiz: [
          {
            q: { en: 'AI output should be treated as…', ar: 'يجب التعامل مع مخرجات AI كـ…' },
            options: { en: ['Always perfect', 'A draft to verify', 'A legal contract', 'Private password'], ar: ['دائماً مثالية', 'مسودة للتحقق', 'عقد قانوني', 'كلمة مرور'] },
            answer: 1,
          },
        ],
      },
    },
  },
  {
    id: 'design',
    icon: 'Palette',
    color: '#D9EBDD',
    difficulty: 'beginner',
    duration: 40,
    title: { en: 'Graphic Design Skills', ar: 'مهارات التصميم الجرافيكي' },
    description: {
      en: 'Learn Canva basics, posters, presentations, colors, fonts, and digital content.',
      ar: 'تعلّم أساسيات Canva والملصقات والعروض والألوان والخطوط والمحتوى الرقمي.',
    },
    objectives: {
      en: ['Use Canva confidently', 'Apply color & font basics', 'Design posters and slides'],
      ar: ['استخدام Canva بثقة', 'تطبيق أساسيات اللون والخط', 'تصميم ملصقات وشرائح'],
    },
    topics: {
      en: ['Canva basics', 'Poster design', 'Presentation design', 'Colors and fonts', 'Digital content'],
      ar: ['أساسيات Canva', 'تصميم الملصقات', 'تصميم العروض', 'الألوان والخطوط', 'المحتوى الرقمي'],
    },
    levels: {
      beginner: {
        duration: 20,
        intro: { en: 'Start designing clean student posters and slides in Canva.', ar: 'ابدأ تصميم ملصقات وشرائح طلابية نظيفة في Canva.' },
        lessons: {
          en: [
            { title: 'Canva Interface', content: 'Templates, layers, text, and export settings.' },
            { title: 'Color Basics', content: 'Limit to 2–3 colors; ensure contrast for readability.' },
            { title: 'Typography', content: 'Pair one display font with one readable body font.' },
          ],
          ar: [
            { title: 'واجهة Canva', content: 'القوالب والطبقات والنص وإعدادات التصدير.' },
            { title: 'أساسيات اللون', content: 'اقتصر على 2–3 ألوان؛ احرص على التباين.' },
            { title: 'الخطوط', content: 'اجمع خطاً عرضياً مع خط قراءة واضح.' },
          ],
        },
        examples: { en: ['Design a club event poster (A4).'], ar: ['صمّم ملصق فعالية نادٍ (A4).'] },
        activity: {
          en: { prompt: 'Pick 2 fonts for a study poster and explain why.', placeholder: 'Heading: ... Body: ...' },
          ar: { prompt: 'اختر خطين لملصق دراسة واشرح السبب.', placeholder: 'عنوان: ... نص: ...' },
        },
        quiz: [
          {
            q: { en: 'Good design contrast helps with…', ar: 'التباين الجيد يساعد على…' },
            options: { en: ['Readability', 'Slower Wi‑Fi', 'More spam', 'Broken links'], ar: ['القراءة', 'إنترنت أبطأ', 'مزيد من الرسائل المزعجة', 'روابط مكسورة'] },
            answer: 0,
          },
        ],
      },
      intermediate: {
        duration: 30,
        intro: { en: 'Create cohesive presentation decks and social graphics.', ar: 'أنشئ عروضاً متناسقة ورسومات اجتماعية.' },
        lessons: {
          en: [
            { title: 'Layout Grids', content: 'Align elements; use whitespace intentionally.' },
            { title: 'Visual Hierarchy', content: 'Size and weight guide the eye to the main message.' },
          ],
          ar: [
            { title: 'شبكات التخطيط', content: 'حاذِ العناصر واستخدم المساحات بوعي.' },
            { title: 'التسلسل البصري', content: 'الحجم والوزن يوجهان العين للرسالة الرئيسية.' },
          ],
        },
        examples: { en: ['Redesign a cluttered slide into a clean one.'], ar: ['أعد تصميم شريحة مزدحمة إلى شريحة نظيفة.'] },
        activity: {
          en: { prompt: 'List 3 elements of visual hierarchy.', placeholder: 'Size, color...' },
          ar: { prompt: 'اذكر 3 عناصر للتسلسل البصري.', placeholder: 'الحجم، اللون...' },
        },
        quiz: [
          {
            q: { en: 'Whitespace in design is…', ar: 'المساحات الفارغة في التصميم هي…' },
            options: { en: ['Wasted space always', 'Useful breathing room', 'A bug', 'Only for print'], ar: ['هدر دائماً', 'مساحة تنفّس مفيدة', 'خلل', 'للطباعة فقط'] },
            answer: 1,
          },
        ],
      },
      advanced: {
        duration: 55,
        intro: { en: 'Complete a Canva mini-project for a campus campaign.', ar: 'أكمل مشروعاً مصغراً في Canva لحملة جامعية.' },
        lessons: {
          en: [
            { title: 'Brand Kit', content: 'Define colors, fonts, and logo placement rules.' },
            { title: 'Export for Use', content: 'Choose PNG/PDF sizes for print vs social.' },
          ],
          ar: [
            { title: 'هوية بصرية', content: 'حدّد الألوان والخطوط وقواعد وضع الشعار.' },
            { title: 'التصدير للاستخدام', content: 'اختر أحجام PNG/PDF للطباعة مقابل التواصل.' },
          ],
        },
        examples: { en: ['Deliver poster + Instagram square + slide cover.'], ar: ['سلّم ملصقاً + مربع إنستغرام + غلاف شريحة.'] },
        activity: {
          en: { prompt: 'Describe your 3-color student brand palette.', placeholder: 'Primary...' },
          ar: { prompt: 'صف لوحة ألوانك الطلابية من 3 ألوان.', placeholder: 'أساسي...' },
        },
        quiz: [
          {
            q: { en: 'A brand kit typically includes…', ar: 'هوية بصرية عادة تتضمن…' },
            options: { en: ['Colors & fonts', 'Passwords', 'Wi‑Fi keys', 'CPU speed'], ar: ['ألوان وخطوط', 'كلمات مرور', 'مفاتيح Wi‑Fi', 'سرعة المعالج'] },
            answer: 0,
          },
        ],
      },
    },
  },
  {
    id: 'communication',
    icon: 'MessageSquare',
    color: '#DCCCF3',
    difficulty: 'beginner',
    duration: 30,
    title: { en: 'Digital Communication Skills', ar: 'مهارات التواصل الرقمي' },
    description: {
      en: 'Write professional emails, run online meetings, collaborate digitally, and practice etiquette.',
      ar: 'اكتب بريداً مهنياً، أدِر اجتماعات أونلاين، تعاون رقمياً، ومارس آداب التواصل.',
    },
    objectives: {
      en: ['Write clear emails', 'Run respectful meetings', 'Collaborate online'],
      ar: ['كتابة بريد واضح', 'إدارة اجتماعات محترمة', 'التعاون أونلاين'],
    },
    topics: {
      en: ['Professional email', 'Online meetings', 'Digital collaboration', 'Online etiquette'],
      ar: ['البريد المهني', 'الاجتماعات أونلاين', 'التعاون الرقمي', 'آداب التواصل'],
    },
    levels: {
      beginner: {
        duration: 15,
        intro: { en: 'Communicate clearly and professionally in digital spaces.', ar: 'تواصل بوضوح واحترافية في المساحات الرقمية.' },
        lessons: {
          en: [
            { title: 'Email Structure', content: 'Subject, greeting, purpose, ask, closing, signature.' },
            { title: 'Meeting Basics', content: 'Mute when needed, agenda, camera etiquette, follow-ups.' },
          ],
          ar: [
            { title: 'بنية البريد', content: 'الموضوع، التحية، الهدف، الطلب، الخاتمة، التوقيع.' },
            { title: 'أساسيات الاجتماع', content: 'كتم الصوت، جدول الأعمال، آداب الكاميرا، المتابعة.' },
          ],
        },
        examples: { en: ['Email a professor about an extension politely.'], ar: ['اكتب بريداً لأستاذ لطلب تمديد بلباقة.'] },
        activity: {
          en: { prompt: 'Write a subject line for requesting a meeting.', placeholder: 'Request: ...' },
          ar: { prompt: 'اكتب عنوان بريد لطلب اجتماع.', placeholder: 'طلب: ...' },
        },
        quiz: [
          {
            q: { en: 'A strong email subject should be…', ar: 'عنوان بريد قوي يجب أن يكون…' },
            options: { en: ['Vague', 'Clear and specific', 'ALL CAPS spammy', 'Empty'], ar: ['غامضاً', 'واضحاً ومحدداً', 'بأحرف كبيرة مزعجة', 'فارغاً'] },
            answer: 1,
          },
        ],
      },
      intermediate: {
        duration: 25,
        intro: { en: 'Collaborate asynchronously with clarity and deadlines.', ar: 'تعاون غير متزامن بوضوح ومواعيد.' },
        lessons: {
          en: [
            { title: 'Async Updates', content: 'Use bullet status updates: Done / Doing / Blocked.' },
            { title: 'Tone Online', content: 'Assume good intent; be concise; avoid ALL CAPS.' },
          ],
          ar: [
            { title: 'تحديثات غير متزامنة', content: 'استخدم نقاط: تم / قيد العمل / عائق.' },
            { title: 'نبرة أونلاين', content: 'افترض حسن النية؛ كن موجزاً؛ تجنب الأحرف الكبيرة.' },
          ],
        },
        examples: { en: ['Write a Slack/Teams status for a group assignment.'], ar: ['اكتب تحديث حالة لمشروع جماعي.'] },
        activity: {
          en: { prompt: 'Rewrite a rude message into a polite one.', placeholder: 'Original → polite' },
          ar: { prompt: 'أعد صياغة رسالة فظة إلى مهذبة.', placeholder: 'الأصلية → المهذبة' },
        },
        quiz: [
          {
            q: { en: 'Async collaboration works best with…', ar: 'التعاون غير المتزامن يعمل أفضل مع…' },
            options: { en: ['Clear written updates', 'No deadlines', 'Hidden files', 'Silence forever'], ar: ['تحديثات مكتوبة واضحة', 'بدون مواعيد', 'ملفات مخفية', 'صمت دائم'] },
            answer: 0,
          },
        ],
      },
      advanced: {
        duration: 45,
        intro: { en: 'Facilitate digital meetings and document decisions.', ar: 'يسّر الاجتماعات الرقمية ووثّق القرارات.' },
        lessons: {
          en: [
            { title: 'Facilitation', content: 'Timebox topics, invite quieter voices, capture action items.' },
            { title: 'Decision Logs', content: 'Record who decided what and why for the team.' },
          ],
          ar: [
            { title: 'تيسير الاجتماع', content: 'حدّد وقتاً للمواضيع، أشرك الأصوات الهادئة، سجّل المهام.' },
            { title: 'سجل القرارات', content: 'سجّل من قرر ماذا ولماذا للفريق.' },
          ],
        },
        examples: { en: ['Run a 20-min standup with notes template.'], ar: ['أدِر اجتماعاً قصيراً بقالب ملاحظات.'] },
        activity: {
          en: { prompt: 'List 4 agenda items for a project kickoff call.', placeholder: '1...' },
          ar: { prompt: 'اذكر 4 بنود لجدول أعمال اجتماع انطلاق.', placeholder: '1...' },
        },
        quiz: [
          {
            q: { en: 'Action items after meetings should include…', ar: 'مهام ما بعد الاجتماع يجب أن تتضمن…' },
            options: { en: ['Owner + deadline', 'Nothing', 'Only emojis', 'Random files'], ar: ['مسؤول + موعد', 'لا شيء', 'إيموجي فقط', 'ملفات عشوائية'] },
            answer: 0,
          },
        ],
      },
    },
  },
  {
    id: 'cyber',
    icon: 'Shield',
    color: '#F4DDE8',
    difficulty: 'beginner',
    duration: 35,
    title: { en: 'Cybersecurity and Online Safety', ar: 'الأمن السيبراني والسلامة أونلاين' },
    description: {
      en: 'Create strong passwords, spot phishing, protect data, browse safely, and understand privacy.',
      ar: 'أنشئ كلمات مرور قوية، اكتشف التصيّد، احمِ بياناتك، تصفّح بأمان، وافهم الخصوصية.',
    },
    objectives: {
      en: ['Use strong passwords', 'Recognize phishing', 'Protect personal info'],
      ar: ['كلمات مرور قوية', 'التعرف على التصيّد', 'حماية المعلومات الشخصية'],
    },
    topics: {
      en: ['Strong passwords', 'Phishing', 'Personal information', 'Safe browsing', 'Online privacy'],
      ar: ['كلمات مرور قوية', 'التصيّد', 'المعلومات الشخصية', 'التصفح الآمن', 'الخصوصية أونلاين'],
    },
    levels: {
      beginner: {
        duration: 15,
        intro: { en: 'Build everyday habits that keep your accounts safer.', ar: 'ابنِ عادات يومية تحمي حساباتك.' },
        lessons: {
          en: [
            { title: 'Passwords & MFA', content: 'Long unique passwords + authenticator apps beat reused short ones.' },
            { title: 'Phishing Signs', content: 'Urgent tone, odd links, unexpected attachments, spoofed senders.' },
          ],
          ar: [
            { title: 'كلمات المرور و MFA', content: 'كلمات طويلة فريدة + تطبيقات تحقق أفضل من القصيرة المعاد استخدامها.' },
            { title: 'علامات التصيّد', content: 'إلحاح، روابط غريبة، مرفقات غير متوقعة، مرسل مزيف.' },
          ],
        },
        examples: { en: ['Check a sample email for phishing red flags.'], ar: ['افحص بريداً نموذجياً بحثاً عن علامات تصيّد.'] },
        activity: {
          en: { prompt: 'List 3 red flags in a phishing email.', placeholder: '1...' },
          ar: { prompt: 'اذكر 3 علامات حمراء في بريد تصيّد.', placeholder: '1...' },
        },
        quiz: [
          {
            q: { en: 'MFA stands for…', ar: 'MFA تعني…' },
            options: { en: ['Multi-Factor Authentication', 'My Favorite App', 'Mail File Archive', 'Main Frame Access'], ar: ['مصادقة متعددة العوامل', 'تطبيقي المفضل', 'أرشيف ملفات البريد', 'وصول الحاسوب الكبير'] },
            answer: 0,
          },
        ],
      },
      intermediate: {
        duration: 30,
        intro: { en: 'Protect privacy settings and practice safe browsing.', ar: 'احمِ إعدادات الخصوصية ومارس تصفحاً آمناً.' },
        lessons: {
          en: [
            { title: 'Privacy Settings', content: 'Review app permissions and social sharing defaults.' },
            { title: 'Safe Browsing', content: 'Prefer HTTPS, avoid shady downloads, keep software updated.' },
          ],
          ar: [
            { title: 'إعدادات الخصوصية', content: 'راجع صلاحيات التطبيقات وإعدادات المشاركة.' },
            { title: 'تصفح آمن', content: 'فضّل HTTPS، تجنب التحميلات المشبوهة، حدّث البرامج.' },
          ],
        },
        examples: { en: ['Audit permissions on your phone for unused apps.'], ar: ['راجع صلاحيات هاتفك للتطبيقات غير المستخدمة.'] },
        activity: {
          en: { prompt: 'Name 2 privacy settings you will review this week.', placeholder: 'Location, contacts...' },
          ar: { prompt: 'اذكر إعدادي خصوصية ستراجعهما هذا الأسبوع.', placeholder: 'الموقع، جهات الاتصال...' },
        },
        quiz: [
          {
            q: { en: 'HTTPS in the address bar indicates…', ar: 'HTTPS في شريط العنوان يشير إلى…' },
            options: { en: ['Encrypted connection', 'Free food', 'Faster CPU', 'No need for passwords'], ar: ['اتصال مشفّر', 'طعام مجاني', 'معالج أسرع', 'لا حاجة لكلمات مرور'] },
            answer: 0,
          },
        ],
      },
      advanced: {
        duration: 50,
        intro: { en: 'Build a personal security checklist for student life.', ar: 'ابنِ قائمة أمان شخصية لحياة الطالب.' },
        lessons: {
          en: [
            { title: 'Data Minimization', content: 'Share only what is needed; use aliases when possible.' },
            { title: 'Incident Response', content: 'If compromised: change passwords, enable MFA, notify contacts.' },
          ],
          ar: [
            { title: 'تقليل البيانات', content: 'شارك فقط ما يلزم؛ استخدم أسماء مستعارة عند الإمكان.' },
            { title: 'الاستجابة للحوادث', content: 'عند الاختراق: غيّر كلمات المرور، فعّل MFA، أبلغ المعنيين.' },
          ],
        },
        examples: { en: ['Create a 10-item security checklist.'], ar: ['أنشئ قائمة أمان من 10 بنود.'] },
        activity: {
          en: { prompt: 'Write your first 5 security checklist items.', placeholder: '1. MFA on email...' },
          ar: { prompt: 'اكتب أول 5 بنود في قائمة أمانك.', placeholder: '1. MFA على البريد...' },
        },
        quiz: [
          {
            q: { en: 'If an account is compromised you should first…', ar: 'إذا اختُرق حساب يجب أولاً…' },
            options: { en: ['Ignore it', 'Secure password + MFA', 'Post publicly', 'Delete OS'], ar: ['تجاهله', 'تأمين كلمة المرور + MFA', 'النشر علناً', 'حذف النظام'] },
            answer: 1,
          },
        ],
      },
    },
  },
  {
    id: 'coding',
    icon: 'Code2',
    color: '#B8D4F0',
    difficulty: 'beginner',
    duration: 50,
    title: { en: 'Basic Coding and Web Development', ar: 'أساسيات البرمجة وتطوير الويب' },
    description: {
      en: 'Learn HTML, CSS, and JavaScript basics and build a simple webpage.',
      ar: 'تعلّم أساسيات HTML و CSS و JavaScript وابنِ صفحة ويب بسيطة.',
    },
    objectives: {
      en: ['Structure pages with HTML', 'Style with CSS', 'Add simple JS interactivity'],
      ar: ['بنية الصفحات بـ HTML', 'التنسيق بـ CSS', 'تفاعل بسيط بـ JS'],
    },
    topics: {
      en: ['HTML basics', 'CSS basics', 'JavaScript introduction', 'Simple webpage'],
      ar: ['أساسيات HTML', 'أساسيات CSS', 'مقدمة JavaScript', 'صفحة ويب بسيطة'],
    },
    levels: {
      beginner: {
        duration: 20,
        intro: { en: 'Create your first structured webpage with HTML.', ar: 'أنشئ أول صفحة منظمة بـ HTML.' },
        lessons: {
          en: [
            { title: 'HTML Structure', content: 'html, head, body, headings, paragraphs, links, lists.' },
            { title: 'CSS Selectors', content: 'Change color, font, spacing with classes and IDs.' },
          ],
          ar: [
            { title: 'بنية HTML', content: 'html و head و body والعناوين والفقرات والروابط والقوائم.' },
            { title: 'محددات CSS', content: 'غيّر اللون والخط والمسافات بالأصناف والمعرّفات.' },
          ],
        },
        examples: { en: ['Build a personal “About Me” page skeleton.'], ar: ['ابنِ هيكل صفحة "عني".'] },
        activity: {
          en: { prompt: 'Write the HTML for a heading and a paragraph.', placeholder: '<h1>...' },
          ar: { prompt: 'اكتب HTML لعنوان وفقرة.', placeholder: '<h1>...' },
        },
        quiz: [
          {
            q: { en: 'Which tag creates a paragraph?', ar: 'أي وسم ينشئ فقرة؟' },
            options: { en: ['<p>', '<h1>', '<link>', '<script>'], ar: ['<p>', '<h1>', '<link>', '<script>'] },
            answer: 0,
          },
        ],
      },
      intermediate: {
        duration: 35,
        intro: { en: 'Style layouts and add a button click with JavaScript.', ar: 'نسّق التخطيطات وأضف نقرة زر بـ JavaScript.' },
        lessons: {
          en: [
            { title: 'Flexbox Intro', content: 'Align items in rows/columns with display:flex.' },
            { title: 'JS Events', content: 'Use addEventListener to respond to clicks.' },
          ],
          ar: [
            { title: 'مقدمة Flexbox', content: 'حاذِ العناصر أفقياً/عمودياً بـ display:flex.' },
            { title: 'أحداث JS', content: 'استخدم addEventListener للاستجابة للنقرات.' },
          ],
        },
        examples: { en: ['Add a dark-mode toggle button.'], ar: ['أضف زر تبديل الوضع الداكن.'] },
        activity: {
          en: { prompt: 'Describe what happens on a button click in your page.', placeholder: 'On click...' },
          ar: { prompt: 'صف ماذا يحدث عند نقر زر في صفحتك.', placeholder: 'عند النقر...' },
        },
        quiz: [
          {
            q: { en: 'Flexbox is mainly for…', ar: 'Flexbox أساساً لـ…' },
            options: { en: ['Layout alignment', 'Database storage', 'Email viruses', 'Password hashing'], ar: ['محاذاة التخطيط', 'تخزين قواعد البيانات', 'فيروسات البريد', 'تجزئة كلمات المرور'] },
            answer: 0,
          },
        ],
      },
      advanced: {
        duration: 60,
        intro: { en: 'Ship a simple multi-section webpage project.', ar: 'أنجز مشروع صفحة متعددة الأقسام.' },
        lessons: {
          en: [
            { title: 'Page Sections', content: 'Nav, hero, content, footer—semantic tags help accessibility.' },
            { title: 'Polish', content: 'Responsive font sizes and mobile-friendly spacing.' },
          ],
          ar: [
            { title: 'أقسام الصفحة', content: 'شريط تنقل، بطل، محتوى، تذييل—الوسوم الدلالية تساعد الوصول.' },
            { title: 'اللمسات الأخيرة', content: 'أحجام خطوط متجاوبة ومسافات مناسبة للجوال.' },
          ],
        },
        examples: { en: ['Publish a one-page portfolio locally.'], ar: ['انشر محفظة من صفحة واحدة محلياً.'] },
        activity: {
          en: { prompt: 'List sections you will include in your webpage.', placeholder: 'Nav, About...' },
          ar: { prompt: 'اذكر أقسام صفحتك.', placeholder: 'تنقل، عني...' },
        },
        quiz: [
          {
            q: { en: 'Semantic HTML improves…', ar: 'HTML الدلالي يحسّن…' },
            options: { en: ['Accessibility & structure', 'Battery myths', 'Printer ink only', 'Nothing'], ar: ['الوصول والبنية', 'خرافات البطارية', 'حبر الطابعة فقط', 'لا شيء'] },
            answer: 0,
          },
        ],
      },
    },
  },
  {
    id: 'data',
    icon: 'BarChart3',
    color: '#FFF1D6',
    difficulty: 'intermediate',
    duration: 45,
    title: { en: 'Data Analysis and Digital Research', ar: 'تحليل البيانات والبحث الرقمي' },
    description: {
      en: 'Research online, find reliable sources, organize data, analyze in Excel, and create charts.',
      ar: 'ابحث أونلاين، اعثر على مصادر موثوقة، نظّم البيانات، حلّل في Excel، وأنشئ رسوماً.',
    },
    objectives: {
      en: ['Find reliable sources', 'Organize digital data', 'Create basic charts'],
      ar: ['إيجاد مصادر موثوقة', 'تنظيم البيانات الرقمية', 'إنشاء رسوم أساسية'],
    },
    topics: {
      en: ['Online research', 'Reliable information', 'Organizing data', 'Excel analysis', 'Charts', 'Basic statistics'],
      ar: ['البحث أونلاين', 'معلومات موثوقة', 'تنظيم البيانات', 'تحليل Excel', 'الرسوم', 'إحصاء أساسي'],
    },
    levels: {
      beginner: {
        duration: 20,
        intro: { en: 'Evaluate sources and organize findings for assignments.', ar: 'قيّم المصادر ونظّم النتائج للواجبات.' },
        lessons: {
          en: [
            { title: 'Source Quality', content: 'Author, date, evidence, bias, and citations matter.' },
            { title: 'Note Organization', content: 'Use folders/tags; separate claims from evidence.' },
          ],
          ar: [
            { title: 'جودة المصدر', content: 'المؤلف والتاريخ والأدلة والتحيز والاستشهاد مهمة.' },
            { title: 'تنظيم الملاحظات', content: 'استخدم مجلدات/وسوم؛ افصل الادعاءات عن الأدلة.' },
          ],
        },
        examples: { en: ['Compare two articles on the same topic for credibility.'], ar: ['قارن مقالتين لنفس الموضوع من حيث المصداقية.'] },
        activity: {
          en: { prompt: 'List 4 criteria for a reliable source.', placeholder: 'Author...' },
          ar: { prompt: 'اذكر 4 معايير لمصدر موثوق.', placeholder: 'المؤلف...' },
        },
        quiz: [
          {
            q: { en: 'A reliable source usually includes…', ar: 'المصدر الموثوق عادة يتضمن…' },
            options: { en: ['Citations & clear authorship', 'Only memes', 'No date ever', 'Hidden ads only'], ar: ['استشهادات ومؤلف واضح', 'ميمز فقط', 'بدون تاريخ أبداً', 'إعلانات مخفية فقط'] },
            answer: 0,
          },
        ],
      },
      intermediate: {
        duration: 35,
        intro: { en: 'Clean tabular data and compute simple statistics.', ar: 'نظّف بيانات جدولية واحسب إحصاءات بسيطة.' },
        lessons: {
          en: [
            { title: 'Excel Cleanup', content: 'Remove duplicates, fix types, filter blanks.' },
            { title: 'Basic Stats', content: 'Mean, median, and simple percentages for insights.' },
          ],
          ar: [
            { title: 'تنظيف Excel', content: 'أزل التكرار، صحّح الأنواع، صفِّ الفراغات.' },
            { title: 'إحصاء أساسي', content: 'المتوسط والوسيط والنسب المئوية للرؤى.' },
          ],
        },
        examples: { en: ['Compute average grade from a student list.'], ar: ['احسب متوسط الدرجات من قائمة طلاب.'] },
        activity: {
          en: { prompt: 'When is median better than mean?', placeholder: 'When outliers...' },
          ar: { prompt: 'متى يكون الوسيط أفضل من المتوسط؟', placeholder: 'عند القيم الشاذة...' },
        },
        quiz: [
          {
            q: { en: 'Removing duplicates helps with…', ar: 'إزالة التكرار تساعد على…' },
            options: { en: ['Cleaner analysis', 'Slower Wi‑Fi', 'More phishing', 'Broken CSS'], ar: ['تحليل أنظف', 'إنترنت أبطأ', 'مزيد من التصيّد', 'CSS معطوب'] },
            answer: 0,
          },
        ],
      },
      advanced: {
        duration: 55,
        intro: { en: 'Tell a story with charts and a short research brief.', ar: 'اروِ قصة بالرسوم وملخص بحث قصير.' },
        lessons: {
          en: [
            { title: 'Chart Choice', content: 'Bars for comparison, lines for trends, pie sparingly.' },
            { title: 'Research Brief', content: 'Question → method → findings → limitations.' },
          ],
          ar: [
            { title: 'اختيار الرسم', content: 'أعمدة للمقارنة، خطوط للاتجاهات، دائري بحذر.' },
            { title: 'ملخص بحث', content: 'سؤال → منهج → نتائج → قيود.' },
          ],
        },
        examples: { en: ['Produce a 1-page brief with one chart.'], ar: ['أنتج ملخصاً من صفحة مع رسم واحد.'] },
        activity: {
          en: { prompt: 'Choose a chart type for monthly study hours and why.', placeholder: 'Line chart because...' },
          ar: { prompt: 'اختر نوع رسم لساعات الدراسة الشهرية ولماذا.', placeholder: 'خطي لأن...' },
        },
        quiz: [
          {
            q: { en: 'Line charts are best for…', ar: 'الرسوم الخطية أفضل لـ…' },
            options: { en: ['Trends over time', 'Password storage', 'Email tone', 'Font licensing'], ar: ['الاتجاهات عبر الزمن', 'تخزين كلمات المرور', 'نبرة البريد', 'ترخيص الخطوط'] },
            answer: 0,
          },
        ],
      },
    },
  },
]
