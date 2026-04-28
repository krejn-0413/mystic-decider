const hexagrams = [
  {
    id: 1, name: "乾", unicode: "\u4DC0", pinyin: "qián",
    meaning: "天行健，君子以自强不息",
    description: "乾为天，象征天道运行，刚健不息。此卦六爻皆阳，代表创造、力量、成功与领导力。",
    judgment: "元亨利贞。",
    lines: [
      { position: 1, text: "潜龙勿用。" },
      { position: 2, text: "见龙在田，利见大人。" },
      { position: 3, text: "君子终日乾乾，夕惕若厉，无咎。" },
      { position: 4, text: "或跃在渊，无咎。" },
      { position: 5, text: "飞龙在天，利见大人。" },
      { position: 6, text: "亢龙有悔。" },
    ],
    keywords: ["开创", "领导", "成功", "行动力", "自信"],
    modern: {
      career: "适合大胆启动新项目或创业，主动出击方能成功。保持谦逊但充满信心。",
      relationship: "积极主动但不可过于强势。展现领导力的同时要顾及对方感受。",
      health: "精力充沛，适合开始新的锻炼计划。注意不要过度劳累。",
      advice: "时机成熟，大胆行动。但切记物极必反，需保持进退有度。"
    },
    upperTrigram: "乾", lowerTrigram: "乾",
    yao: [1,1,1,1,1,1]
  },
  {
    id: 2, name: "坤", unicode: "\u4DC1", pinyin: "kūn",
    meaning: "地势坤，君子以厚德载物",
    description: "坤为地，象征大地包容、柔顺、承载万物。此卦六爻皆阴，代表接受、培育、耐心与合作。",
    judgment: "元亨，利牝马之贞。君子有攸往，先迷后得主，利。西南得朋，东北丧朋。安贞吉。",
    lines: [
      { position: 1, text: "履霜，坚冰至。" },
      { position: 2, text: "直方大，不习无不利。" },
      { position: 3, text: "含章可贞，或从王事，无成有终。" },
      { position: 4, text: "括囊，无咎无誉。" },
      { position: 5, text: "黄裳，元吉。" },
      { position: 6, text: "龙战于野，其血玄黄。" },
    ],
    keywords: ["包容", "柔顺", "耐心", "合作", "滋养"],
    modern: {
      career: "适合辅助、协调、支持型角色。以柔克刚，以退为进。不宜强出头。",
      relationship: "以包容和理解维护关系。给予对方空间和支持，感情自然深厚。",
      health: "注意脾胃消化系统，适合温和的运动如瑜伽、太极。",
      advice: "保持谦虚低调，厚积薄发。不争之争，才是大智慧。"
    },
    upperTrigram: "坤", lowerTrigram: "坤",
    yao: [0,0,0,0,0,0]
  },
  {
    id: 3, name: "屯", unicode: "\u4DC2", pinyin: "zhūn",
    meaning: "云雷屯，君子以经纶",
    description: "屯卦象征万物初生之时的艰难与希望。如同雷雨交加之中，生机在酝酿。虽困难重重，但前途光明。",
    judgment: "元亨利贞。勿用有攸往，利建侯。",
    lines: [
      { position: 1, text: "磐桓，利居贞，利建侯。" },
      { position: 2, text: "屯如邅如，乘马班如。匪寇婚媾，女子贞不字，十年乃字。" },
      { position: 3, text: "即鹿无虞，惟入于林中，君子几不如舍，往吝。" },
      { position: 4, text: "乘马班如，求婚媾，往吉，无不利。" },
      { position: 5, text: "屯其膏，小贞吉，大贞凶。" },
      { position: 6, text: "乘马班如，泣血涟如。" },
    ],
    keywords: ["初创", "艰难", "希望", "坚持", "突破"],
    modern: {
      career: "创业或新项目初期会遇到很多困难。坚持下去，黎明就在前方。",
      relationship: "感情初期需要耐心培养，不要急于求成。真心付出终有回报。",
      health: "可能有小病困扰，但并无大碍。注意休息和调养。",
      advice: "万事开头难。面对挑战要保持韧性和耐心，寻求贵人相助。"
    },
    upperTrigram: "坎", lowerTrigram: "震",
    yao: [1,0,0,0,1,0]
  },
  {
    id: 4, name: "蒙", unicode: "\u4DC3", pinyin: "méng",
    meaning: "山下出泉，蒙。君子以果行育德",
    description: "蒙卦象征启蒙、教育。如同山下流出的清泉，虽稚嫩但充满潜力。代表学习、成长和开启智慧。",
    judgment: "亨。匪我求童蒙，童蒙求我。初筮告，再三渎，渎则不告。利贞。",
    lines: [
      { position: 1, text: "发蒙，利用刑人，用说桎梏，以往吝。" },
      { position: 2, text: "包蒙，吉。纳妇，吉。子克家。" },
      { position: 3, text: "勿用取女，见金夫，不有躬，无攸利。" },
      { position: 4, text: "困蒙，吝。" },
      { position: 5, text: "童蒙，吉。" },
      { position: 6, text: "击蒙，不利为寇，利御寇。" },
    ],
    keywords: ["启蒙", "学习", "教育", "成长", "求知"],
    modern: {
      career: "适合学习新技能、接受培训。虚心求教，不要不懂装懂。",
      relationship: "像对待学生一样耐心经营感情，共同成长比完美更重要。",
      health: "关注心理健康和学习压力调节。适当的休息也是进步。",
      advice: "保持谦虚好学的态度。向有经验的人请教，可以少走弯路。"
    },
    upperTrigram: "艮", lowerTrigram: "坎",
    yao: [0,1,0,0,0,1]
  },
  {
    id: 5, name: "需", unicode: "\u4DC4", pinyin: "xū",
    meaning: "云上于天，需。君子以饮食宴乐",
    description: "需卦象征等待、需求。云在天上，雨尚未降，需要耐心等待时机。此卦教导我们在等待中做好准备。",
    judgment: "有孚，光亨，贞吉。利涉大川。",
    lines: [
      { position: 1, text: "需于郊，利用恒，无咎。" },
      { position: 2, text: "需于沙，小有言，终吉。" },
      { position: 3, text: "需于泥，致寇至。" },
      { position: 4, text: "需于血，出自穴。" },
      { position: 5, text: "需于酒食，贞吉。" },
      { position: 6, text: "入于穴，有不速之客三人来，敬之终吉。" },
    ],
    keywords: ["等待", "耐心", "准备", "时机", "信心"],
    modern: {
      career: "不宜冒进，耐心等待最佳时机。在等待中做好充分准备。",
      relationship: "感情需要时间培养，给对方空间，顺其自然。",
      health: "注意饮食规律，不要因焦虑影响消化系统。",
      advice: "等待不是消极，而是积极准备。时机成熟时自然水到渠成。"
    },
    upperTrigram: "坎", lowerTrigram: "乾",
    yao: [1,1,1,0,1,0]
  },
  {
    id: 6, name: "讼", unicode: "\u4DC5", pinyin: "sòng",
    meaning: "天与水违行，讼。君子以作事谋始",
    description: "讼卦象征争讼、冲突。天在上、水在下，背道而驰。代表意见不合、法律纠纷或竞争。",
    judgment: "有孚窒惕，中吉，终凶。利见大人，不利涉大川。",
    lines: [
      { position: 1, text: "不永所事，小有言，终吉。" },
      { position: 2, text: "不克讼，归而逋，其邑人三百户，无眚。" },
      { position: 3, text: "食旧德，贞厉，终吉。或从王事，无成。" },
      { position: 4, text: "不克讼，复即命，渝安贞，吉。" },
      { position: 5, text: "讼元吉。" },
      { position: 6, text: "或锡之鞶带，终朝三褫之。" },
    ],
    keywords: ["冲突", "争辩", "诉讼", "竞争", "和解"],
    modern: {
      career: "尽量避免正面冲突和诉讼。寻求调解和共赢方案是上策。",
      relationship: "争吵无益于感情，退一步海阔天空。沟通比争辩更重要。",
      health: "肝气郁结，注意情绪管理。适当运动释放压力。",
      advice: "以和为贵，退一步海阔天空。非必要不争讼，争则两败俱伤。"
    },
    upperTrigram: "乾", lowerTrigram: "坎",
    yao: [0,1,0,1,1,1]
  },
  {
    id: 7, name: "师", unicode: "\u4DC6", pinyin: "shī",
    meaning: "地中有水，师。君子以容民畜众",
    description: "师卦象征军队、团队、领导。地中蓄水，如军队蓄势待发。代表组织、纪律和团队协作。",
    judgment: "贞，丈人吉，无咎。",
    lines: [
      { position: 1, text: "师出以律，否臧凶。" },
      { position: 2, text: "在师中，吉，无咎，王三锡命。" },
      { position: 3, text: "师或舆尸，凶。" },
      { position: 4, text: "师左次，无咎。" },
      { position: 5, text: "田有禽，利执言，无咎。长子帅师，弟子舆尸，贞凶。" },
      { position: 6, text: "大君有命，开国承家，小人勿用。" },
    ],
    keywords: ["团队", "领导", "纪律", "组织", "协作"],
    modern: {
      career: "团队协作是成功的关键。选择正确的领导者和合作伙伴至关重要。",
      relationship: "感情中需要共同目标，步调一致才能走得更远。",
      health: "适合团队运动，增强体质的同时也培养合作精神。",
      advice: "选择大于努力。跟对团队和领导，比单打独斗更有效。"
    },
    upperTrigram: "坤", lowerTrigram: "坎",
    yao: [0,1,0,0,0,0]
  },
  {
    id: 8, name: "比", unicode: "\u4DC7", pinyin: "bǐ",
    meaning: "地上有水，比。先王以建万国，亲诸侯",
    description: "比卦象征亲近、比和、团结。水在地上流淌，亲和无间。代表人际关系、合作与亲附。",
    judgment: "吉。原筮元永贞，无咎。不宁方来，后夫凶。",
    lines: [
      { position: 1, text: "有孚比之，无咎。有孚盈缶，终来有它，吉。" },
      { position: 2, text: "比之自内，贞吉。" },
      { position: 3, text: "比之匪人，不亦伤乎？" },
      { position: 4, text: "外比之，贞吉。" },
      { position: 5, text: "显比，王用三驱，失前禽。邑人不诫，吉。" },
      { position: 6, text: "比之无首，凶。" },
    ],
    keywords: ["亲和", "合作", "团结", "人际关系", "选择"],
    modern: {
      career: "拓展人脉，建立良好的合作关系。选择值得信赖的伙伴。",
      relationship: "真诚相待是感情的基础。广结善缘，但也要慎重选择。",
      health: "社交活动有助于心理健康，多与人交流保持心情愉快。",
      advice: "独行快，众行远。建立真诚的人际关系网是成功的基石。"
    },
    upperTrigram: "坎", lowerTrigram: "坤",
    yao: [0,0,0,0,1,0]
  },
  {
    id: 9, name: "小畜", unicode: "\u4DC8", pinyin: "xiǎo xù",
    meaning: "风行天上，小畜。君子以懿文德",
    description: "小畜卦象征小小的积蓄和等待。风在天上吹拂，雨尚未降，需要不断积累。代表积蓄力量、修身养性。",
    judgment: "亨。密云不雨，自我西郊。",
    lines: [
      { position: 1, text: "复自道，何其咎，吉。" },
      { position: 2, text: "牵复，吉。" },
      { position: 3, text: "舆说辐，夫妻反目。" },
      { position: 4, text: "有孚，血去惕出，无咎。" },
      { position: 5, text: "有孚挛如，富以其邻。" },
      { position: 6, text: "既雨既处，尚德载，妇贞厉。月几望，君子征凶。" },
    ],
    keywords: ["积蓄", "耐心", "积累", "修身", "等待"],
    modern: {
      career: "量变引起质变。持续积累经验和资源，成功指日可待。",
      relationship: "感情需要慢慢培养，不要急于求成。小确幸累积成大幸福。",
      health: "注意循序渐进地锻炼，不可急于求成。",
      advice: "积少成多，聚沙成塔。保持耐心和恒心，收获终会到来。"
    },
    upperTrigram: "巽", lowerTrigram: "乾",
    yao: [1,1,1,0,1,1]
  },
  {
    id: 10, name: "履", unicode: "\u4DC9", pinyin: "lǚ",
    meaning: "上天下泽，履。君子以辩上下，定民志",
    description: "履卦象征履行、实践、礼仪。如同踩在老虎尾巴上却不会被咬，只要谨慎行事。代表行动中的智慧。",
    judgment: "履虎尾，不咥人，亨。",
    lines: [
      { position: 1, text: "素履，往无咎。" },
      { position: 2, text: "履道坦坦，幽人贞吉。" },
      { position: 3, text: "眇能视，跛能履，履虎尾，咥人，凶。武人为于大君。" },
      { position: 4, text: "履虎尾，愬愬终吉。" },
      { position: 5, text: "夬履，贞厉。" },
      { position: 6, text: "视履考祥，其旋元吉。" },
    ],
    keywords: ["实践", "行动", "谨慎", "礼仪", "执行"],
    modern: {
      career: "大胆行动但要小心谨慎。在危险中寻找机会，展现你的能力。",
      relationship: "言行一致，以诚相待。小心的表达胜过华丽的言辞。",
      health: "注意脚下安全，防止跌倒受伤。适当运动保持灵活。",
      advice: "如履薄冰，小心驶得万年船。谨慎行事但不要畏惧行动。"
    },
    upperTrigram: "乾", lowerTrigram: "兑",
    yao: [1,1,0,1,1,1]
  },
  {
    id: 11, name: "泰", unicode: "\u4DCA", pinyin: "tài",
    meaning: "天地交，泰。后以财成天地之道，辅相天地之宜",
    description: "泰卦象征通达、安泰。天地交融，万物通泰。代表顺利、和谐、繁荣的最佳状态。",
    judgment: "小往大来，吉亨。",
    lines: [
      { position: 1, text: "拔茅茹，以其汇，征吉。" },
      { position: 2, text: "包荒，用冯河，不遐遗，朋亡，得尚于中行。" },
      { position: 3, text: "无平不陂，无往不复，艰贞无咎。勿恤其孚，于食有福。" },
      { position: 4, text: "翩翩不富，以其邻，不戒以孚。" },
      { position: 5, text: "帝乙归妹，以祉元吉。" },
      { position: 6, text: "城复于隍，勿用师。自邑告命，贞吝。" },
    ],
    keywords: ["顺利", "和谐", "繁荣", "通达", "吉祥"],
    modern: {
      career: "万事俱备，顺风顺水。抓住大好时机大展宏图。",
      relationship: "感情和谐美满，是增进关系的好时机。",
      health: "身心状态俱佳，保持良好生活习惯。",
      advice: "顺境中不忘居安思危。好运来临时要懂得珍惜和把握。"
    },
    upperTrigram: "坤", lowerTrigram: "乾",
    yao: [1,1,1,0,0,0]
  },
  {
    id: 12, name: "否", unicode: "\u4DCB", pinyin: "pǐ",
    meaning: "天地不交，否。君子以俭德辟难",
    description: "否卦象征闭塞、不通。天地不交，万物不通。代表困难、阻碍和逆境。",
    judgment: "否之匪人，不利君子贞，大往小来。",
    lines: [
      { position: 1, text: "拔茅茹，以其汇，贞吉亨。" },
      { position: 2, text: "包承，小人吉，大人否亨。" },
      { position: 3, text: "包羞。" },
      { position: 4, text: "有命无咎，畴离祉。" },
      { position: 5, text: "休否，大人吉。其亡其亡，系于苞桑。" },
      { position: 6, text: "倾否，先否后喜。" },
    ],
    keywords: ["困难", "阻碍", "逆境", "忍耐", "转机"],
    modern: {
      career: "当前困难重重，不宜贸然行动。坚守正道，等待时机转变。",
      relationship: "感情遇到瓶颈，需要耐心沟通。暂时的困难会过去。",
      health: "注意情绪低落，保持乐观心态。低谷之后必是回升。",
      advice: "否极泰来。在最困难的时候不要放弃，转机就在不远处。"
    },
    upperTrigram: "乾", lowerTrigram: "坤",
    yao: [0,0,0,1,1,1]
  },
  {
    id: 13, name: "同人", unicode: "\u4DCC", pinyin: "tóng rén",
    meaning: "天与火，同人。君子以类族辨物",
    description: "同人卦象征团结、大同。天与火光明照耀，志同道合者相聚。代表合作、共识和团队精神。",
    judgment: "同人于野，亨。利涉大川，利君子贞。",
    lines: [
      { position: 1, text: "同人于门，无咎。" },
      { position: 2, text: "同人于宗，吝。" },
      { position: 3, text: "伏戎于莽，升其高陵，三岁不兴。" },
      { position: 4, text: "乘其墉，弗克攻，吉。" },
      { position: 5, text: "同人先号咷而后笑，大师克相遇。" },
      { position: 6, text: "同人于郊，无悔。" },
    ],
    keywords: ["团结", "合作", "共识", "志同道合", "大同"],
    modern: {
      career: "寻找志同道合的伙伴，团队合作能攻克任何难关。",
      relationship: "心有灵犀的默契是感情的最高境界。寻找灵魂伴侣。",
      health: "参加团体活动有益身心健康。与他人一起锻炼更有动力。",
      advice: "众志成城。找到真正志同道合的人，共同追求伟大的目标。"
    },
    upperTrigram: "乾", lowerTrigram: "离",
    yao: [1,0,1,1,1,1]
  },
  {
    id: 14, name: "大有", unicode: "\u4DCD", pinyin: "dà yǒu",
    meaning: "火在天上，大有。君子以遏恶扬善，顺天休命",
    description: "大有卦象征大丰收、大拥有。如同太阳高照，万物光辉。代表富足、成功和丰盛。",
    judgment: "元亨。",
    lines: [
      { position: 1, text: "无交害，匪咎，艰则无咎。" },
      { position: 2, text: "大车以载，有攸往，无咎。" },
      { position: 3, text: "公用亨于天子，小人弗克。" },
      { position: 4, text: "匪其彭，无咎。" },
      { position: 5, text: "厥孚交如，威如，吉。" },
      { position: 6, text: "自天佑之，吉无不利。" },
    ],
    keywords: ["富足", "成功", "丰收", "丰盛", "好运"],
    modern: {
      career: "事业如日中天，收获丰硕。善用资源，回馈社会。",
      relationship: "感情富足美满，懂得分享和感恩。",
      health: "身体状况良好，保持现有的健康习惯。",
      advice: "天道酬勤。成功之后要懂得分享和回馈，方能持续长久。"
    },
    upperTrigram: "离", lowerTrigram: "乾",
    yao: [1,1,1,1,0,1]
  },
  {
    id: 15, name: "谦", unicode: "\u4DCE", pinyin: "qiān",
    meaning: "地中有山，谦。君子以裒多益寡，称物平施",
    description: "谦卦象征谦虚、谦逊。高山隐于大地之中，内高而外卑。代表谦虚待人的美德。",
    judgment: "亨，君子有终。",
    lines: [
      { position: 1, text: "谦谦君子，用涉大川，吉。" },
      { position: 2, text: "鸣谦，贞吉。" },
      { position: 3, text: "劳谦君子，有终吉。" },
      { position: 4, text: "无不利，撝谦。" },
      { position: 5, text: "不富以其邻，利用侵伐，无不利。" },
      { position: 6, text: "鸣谦，利用行师，征邑国。" },
    ],
    keywords: ["谦虚", "谦逊", "低调", "美德", "尊重"],
    modern: {
      career: "谦虚使人进步。即使能力很强也要保持低调，赢得尊重。",
      relationship: "谦让是感情的润滑剂。不争不抢反而得到更多。",
      health: "心态平和有利于健康。不以物喜，不以己悲。",
      advice: "满招损，谦受益。真正的强大来自于内心的谦逊。"
    },
    upperTrigram: "坤", lowerTrigram: "艮",
    yao: [0,0,1,0,0,0]
  },
  {
    id: 16, name: "豫", unicode: "\u4DCF", pinyin: "yù",
    meaning: "雷出地奋，豫。先王以作乐崇德",
    description: "豫卦象征愉悦、准备、预谋。雷声从大地爆发，振奋人心。代表快乐、娱乐和预先准备。",
    judgment: "利建侯行师。",
    lines: [
      { position: 1, text: "鸣豫，凶。" },
      { position: 2, text: "介于石，不终日，贞吉。" },
      { position: 3, text: "盱豫悔，迟有悔。" },
      { position: 4, text: "由豫，大有得。勿疑，朋盍簪。" },
      { position: 5, text: "贞疾，恒不死。" },
      { position: 6, text: "冥豫，成有渝，无咎。" },
    ],
    keywords: ["愉悦", "准备", "娱乐", "快乐", "预谋"],
    modern: {
      career: "做好充分准备，机会来临时才能把握住。适当的娱乐放松也必要。",
      relationship: "享受当下的快乐，不要过度忧虑未来。",
      health: "保持愉快心情，该放松时就放松。",
      advice: "凡事预则立，不预则废。享受生活的同時也要为未来做好准备。"
    },
    upperTrigram: "震", lowerTrigram: "坤",
    yao: [0,0,0,1,0,0]
  },
  {
    id: 17, name: "随", unicode: "\u4DD0", pinyin: "suí",
    meaning: "泽中有雷，随。君子以向晦入宴息",
    description: "随卦象征跟随、顺应。雷在泽中，随时而动。代表随从、适应和灵活应变。",
    judgment: "元亨利贞，无咎。",
    lines: [
      { position: 1, text: "官有渝，贞吉。出门交有功。" },
      { position: 2, text: "系小子，失丈夫。" },
      { position: 3, text: "系丈夫，失小子。随有求得，利居贞。" },
      { position: 4, text: "随有获，贞凶。有孚在道，以明，何咎。" },
      { position: 5, text: "孚于嘉，吉。" },
      { position: 6, text: "拘系之，乃从维之，王用亨于西山。" },
    ],
    keywords: ["跟随", "顺应", "灵活", "适应", "随从"],
    modern: {
      career: "顺势而为，不要逆势而行。跟随行业趋势和市场需求。",
      relationship: "感情中要懂得随缘，不强求。顺其自然最幸福。",
      health: "顺应身体的自然需求，不违背生理规律。",
      advice: "识时务者为俊杰。懂得顺应时势，比固执己见更容易成功。"
    },
    upperTrigram: "兑", lowerTrigram: "震",
    yao: [1,0,0,1,1,0]
  },
  {
    id: 18, name: "蛊", unicode: "\u4DD1", pinyin: "gǔ",
    meaning: "山下有风，蛊。君子以振民育德",
    description: "蛊卦象征整治、革新。风在山下受阻，积弊成蛊。代表整顿腐败、改革和创新。",
    judgment: "元亨。利涉大川，先甲三日，后甲三日。",
    lines: [
      { position: 1, text: "干父之蛊，有子，考无咎，厉终吉。" },
      { position: 2, text: "干母之蛊，不可贞。" },
      { position: 3, text: "干父之蛊，小有悔，无大咎。" },
      { position: 4, text: "裕父之蛊，往见吝。" },
      { position: 5, text: "干父之蛊，用誉。" },
      { position: 6, text: "不事王侯，高尚其事。" },
    ],
    keywords: ["革新", "整治", "改革", "整顿", "除弊"],
    modern: {
      career: "发现并解决积弊问题。改革带来新的生机，但要注意方式方法。",
      relationship: "解决感情中的老问题，重建信任。坦诚沟通是第一步。",
      health: "摆脱不良习惯，建立健康的生活方式。",
      advice: "不破不立。发现问题就要果断解决，拖延只会让问题更严重。"
    },
    upperTrigram: "艮", lowerTrigram: "巽",
    yao: [0,1,1,0,0,1]
  },
  {
    id: 19, name: "临", unicode: "\u4DD2", pinyin: "lín",
    meaning: "泽上有地，临。君子以教思无穷，容保民无疆",
    description: "临卦象征临近、面对、君临。泽上有地，居高临下。代表面对挑战、监督管理和领导。",
    judgment: "元亨利贞。至于八月有凶。",
    lines: [
      { position: 1, text: "咸临，贞吉。" },
      { position: 2, text: "咸临，吉无不利。" },
      { position: 3, text: "甘临，无攸利。既忧之，无咎。" },
      { position: 4, text: "至临，无咎。" },
      { position: 5, text: "知临，大君之宜，吉。" },
      { position: 6, text: "敦临，吉无咎。" },
    ],
    keywords: ["面对", "监督", "领导", "管理", "亲临"],
    modern: {
      career: "亲自深入到一线了解情况，领导要身先士卒。",
      relationship: "真诚面对感情中的问题，主动沟通解决。",
      health: "关注身体的早期信号，预防大于治疗。",
      advice: "面对问题不要逃避。亲力亲为、以身作则是最好的管理方式。"
    },
    upperTrigram: "坤", lowerTrigram: "兑",
    yao: [1,1,0,0,0,0]
  },
  {
    id: 20, name: "观", unicode: "\u4DD3", pinyin: "guān",
    meaning: "风行地上，观。先王以省方观民设教",
    description: "观卦象征观察、观望。风行大地，无所不至。代表观察、学习和审时度势。",
    judgment: "盥而不荐，有孚颙若。",
    lines: [
      { position: 1, text: "童观，小人无咎，君子吝。" },
      { position: 2, text: "窥观，利女贞。" },
      { position: 3, text: "观我生进退。" },
      { position: 4, text: "观国之光，利用宾于王。" },
      { position: 5, text: "观我生，君子无咎。" },
      { position: 6, text: "观其生，君子无咎。" },
    ],
    keywords: ["观察", "观望", "学习", "审慎", "洞察"],
    modern: {
      career: "先观察再行动。了解全局后做出明智决策。",
      relationship: "用心观察对方，了解真实需求和想法。",
      health: "留意身体状况的变化，定期体检。",
      advice: "知己知彼，百战不殆。深入观察后再做决定，不要贸然行动。"
    },
    upperTrigram: "巽", lowerTrigram: "坤",
    yao: [0,0,0,0,1,1]
  },
  {
    id: 21, name: "噬嗑", unicode: "\u4DD4", pinyin: "shì hé",
    meaning: "雷电噬嗑，先王以明罚敕法",
    description: "噬嗑卦象征咬合、刑罚、克服阻碍。口中含物，咬碎方能合拢。代表扫除障碍、公正执法。",
    judgment: "亨，利用狱。",
    lines: [
      { position: 1, text: "屦校灭趾，无咎。" },
      { position: 2, text: "噬肤灭鼻，无咎。" },
      { position: 3, text: "噬腊肉，遇毒，小吝，无咎。" },
      { position: 4, text: "噬干胏，得金矢，利艰贞，吉。" },
      { position: 5, text: "噬干肉，得黄金，贞厉，无咎。" },
      { position: 6, text: "何校灭耳，凶。" },
    ],
    keywords: ["克服", "扫除", "公正", "执法", "障碍"],
    modern: {
      career: "突破瓶颈需要果断行动。遇到障碍就要想办法清除。",
      relationship: "化解误会和矛盾，敞开心扉坦诚相待。",
      health: "需要手术或治疗的时期，直面健康问题。",
      advice: "面对障碍不要退缩。果断行动，扫清前进道路上的一切阻碍。"
    },
    upperTrigram: "离", lowerTrigram: "震",
    yao: [1,0,0,1,0,1]
  },
  {
    id: 22, name: "贲", unicode: "\u4DD5", pinyin: "bì",
    meaning: "山下有火，贲。君子以明庶政，无敢折狱",
    description: "贲卦象征装饰、文饰。山下有火，照亮万物。代表修饰、美化、文明和礼仪。",
    judgment: "亨。小利有攸往。",
    lines: [
      { position: 1, text: "贲其趾，舍车而徒。" },
      { position: 2, text: "贲其须。" },
      { position: 3, text: "贲如濡如，永贞吉。" },
      { position: 4, text: "贲如皤如，白马翰如，匪寇婚媾。" },
      { position: 5, text: "贲于丘园，束帛戋戋，吝，终吉。" },
      { position: 6, text: "白贲，无咎。" },
    ],
    keywords: ["装饰", "美化", "礼仪", "文明", "外表"],
    modern: {
      career: "注重形象和品牌建设。好的包装能提升价值，但不要过度。",
      relationship: "外表吸引是开始，内在美才能长久。适度的浪漫和仪式感很重要。",
      health: "关注外在形象的同时也要重视内在健康。",
      advice: "外表与内涵并重。适度的修饰是礼貌，但本质才是决定性的。"
    },
    upperTrigram: "艮", lowerTrigram: "离",
    yao: [1,0,1,0,0,1]
  },
  {
    id: 23, name: "剥", unicode: "\u4DD6", pinyin: "bō",
    meaning: "山附于地，剥。上以厚下安宅",
    description: "剥卦象征剥落、侵蚀。山石崩落于地。代表衰退、剥蚀、失去和警示。",
    judgment: "不利有攸往。",
    lines: [
      { position: 1, text: "剥床以足，蔑贞凶。" },
      { position: 2, text: "剥床以辨，蔑贞凶。" },
      { position: 3, text: "剥之，无咎。" },
      { position: 4, text: "剥床以肤，凶。" },
      { position: 5, text: "贯鱼以宫人宠，无不利。" },
      { position: 6, text: "硕果不食，君子得舆，小人剥庐。" },
    ],
    keywords: ["剥落", "衰退", "失去", "警示", "反思"],
    modern: {
      career: "事业可能面临低谷。此时不宜扩张，应当收缩防守。",
      relationship: "感情可能出现裂痕，需要修补。忽视小问题会酿成大祸。",
      health: "身体处于衰退期，注意保养和休息。",
      advice: "当衰退来临时，不要恐慌。守住根本，等待新的生机。"
    },
    upperTrigram: "艮", lowerTrigram: "坤",
    yao: [0,0,0,0,0,1]
  },
  {
    id: 24, name: "复", unicode: "\u4DD7", pinyin: "fù",
    meaning: "雷在地中，复。先王以至日闭关，商旅不行",
    description: "复卦象征复归、恢复。一阳来复，冬尽春来。代表复兴、回归、重获新生。",
    judgment: "亨。出入无疾，朋来无咎。反复其道，七日来复，利有攸往。",
    lines: [
      { position: 1, text: "不远复，无祗悔，元吉。" },
      { position: 2, text: "休复，吉。" },
      { position: 3, text: "频复，厉无咎。" },
      { position: 4, text: "中行独复。" },
      { position: 5, text: "敦复，无悔。" },
      { position: 6, text: "迷复，凶，有灾眚。用行师，终有大败。" },
    ],
    keywords: ["恢复", "复兴", "回归", "重生", "循环"],
    modern: {
      career: "事业开始回暖。过去的教训成为今日的财富，重新出发。",
      relationship: "破镜重圆的机会。重新点燃爱的火花。",
      health: "身体逐渐康复，保持积极心态。",
      advice: "冬天来了，春天还会远吗？在最黑暗的时刻，光明即将到来。"
    },
    upperTrigram: "坤", lowerTrigram: "震",
    yao: [1,0,0,0,0,0]
  },
  {
    id: 25, name: "无妄", unicode: "\u4DD8", pinyin: "wú wàng",
    meaning: "天下雷行，物与无妄。先王以茂对时育万物",
    description: "无妄卦象征不妄为、顺其自然。雷行天下，万物不敢妄动。代表真诚、自然和遵循规律。",
    judgment: "元亨利贞。其匪正有眚，不利有攸往。",
    lines: [
      { position: 1, text: "无妄，往吉。" },
      { position: 2, text: "不耕获，不菑畲，则利有攸往。" },
      { position: 3, text: "无妄之灾，或系之牛，行人之得，邑人之灾。" },
      { position: 4, text: "可贞，无咎。" },
      { position: 5, text: "无妄之疾，勿药有喜。" },
      { position: 6, text: "无妄，行有眚，无攸利。" },
    ],
    keywords: ["真诚", "自然", "不妄为", "顺其自然", "天道"],
    modern: {
      career: "不要投机取巧，脚踏实地做实事。真诚是最好的策略。",
      relationship: "以真心换真心，不要玩心机和套路。",
      health: "顺其自然地调养，不要过度医疗。",
      advice: "天道无亲，常与善人。保持真诚，做正确的事，不要投机取巧。"
    },
    upperTrigram: "乾", lowerTrigram: "震",
    yao: [1,0,0,1,1,1]
  },
  {
    id: 26, name: "大畜", unicode: "\u4DD9", pinyin: "dà chù",
    meaning: "天在山中，大畜。君子以多识前言往行",
    description: "大畜卦象征大积蓄、大涵养。天在山中，蓄积无限。代表博学多闻、厚积薄发。",
    judgment: "利贞。不家食吉，利涉大川。",
    lines: [
      { position: 1, text: "有厉，利已。" },
      { position: 2, text: "舆说輹。" },
      { position: 3, text: "良马逐，利艰贞。曰闲舆卫，利有攸往。" },
      { position: 4, text: "童牛之牿，元吉。" },
      { position: 5, text: "豮豕之牙，吉。" },
      { position: 6, text: "何天之衢，亨。" },
    ],
    keywords: ["积蓄", "涵养", "博学", "厚积薄发", "储备"],
    modern: {
      career: "大量学习和积累。现在做的每一分努力，未来都会加倍回报。",
      relationship: "慢慢培养感情深度。共同的经历是感情的基石。",
      health: "储备健康资本，坚持锻炼和良好作息。",
      advice: "博观而约取，厚积而薄发。现在的积累都是为了未来的爆发。"
    },
    upperTrigram: "艮", lowerTrigram: "乾",
    yao: [1,1,1,0,0,1]
  },
  {
    id: 27, name: "颐", unicode: "\u4DDA", pinyin: "yí",
    meaning: "山下有雷，颐。君子以慎言语，节饮食",
    description: "颐卦象征颐养、养生。山下雷动，万物滋养。代表养生、营养、言语谨慎。",
    judgment: "贞吉。观颐，自求口实。",
    lines: [
      { position: 1, text: "舍尔灵龟，观我朵颐，凶。" },
      { position: 2, text: "颠颐，拂经于丘颐，征凶。" },
      { position: 3, text: "拂颐，贞凶，十年勿用，无攸利。" },
      { position: 4, text: "颠颐，吉。虎视眈眈，其欲逐逐，无咎。" },
      { position: 5, text: "拂经，居贞吉，不可涉大川。" },
      { position: 6, text: "由颐，厉吉，利涉大川。" },
    ],
    keywords: ["养生", "滋养", "言语", "饮食", "修养"],
    modern: {
      career: "注重自身修养和能力的提升。厚积薄发，不急于求成。",
      relationship: "用心经营感情，给对方精神滋养。",
      health: "注意饮食健康和作息规律。病从口入，祸从口出。",
      advice: "谨言慎行，节欲养生。真正的富有来自内在的丰盈。"
    },
    upperTrigram: "艮", lowerTrigram: "震",
    yao: [1,0,0,0,0,1]
  },
  {
    id: 28, name: "大过", unicode: "\u4DDB", pinyin: "dà guò",
    meaning: "泽灭木，大过。君子以独立不惧，遁世无闷",
    description: "大过卦象征大过度、非常规。水淹树木，超出常态。代表过度的力量、非常时期和非常手段。",
    judgment: "栋桡，利有攸往，亨。",
    lines: [
      { position: 1, text: "藉用白茅，无咎。" },
      { position: 2, text: "枯杨生稊，老夫得其女妻，无不利。" },
      { position: 3, text: "栋桡，凶。" },
      { position: 4, text: "栋隆，吉。有它吝。" },
      { position: 5, text: "枯杨生华，老妇得其士夫，无咎无誉。" },
      { position: 6, text: "过涉灭顶，凶，无咎。" },
    ],
    keywords: ["过度", "非常", "变革", "非常规", "警示"],
    modern: {
      career: "非常时期需要非常手段。但要注意把握分寸，过犹不及。",
      relationship: "年龄或背景差异较大的感情，需要更多勇气面对外界眼光。",
      health: "注意不要过度劳累，避免极限运动。",
      advice: "非常之时行非常之事。但要记住，过犹不及，中庸之道才是长久。"
    },
    upperTrigram: "兑", lowerTrigram: "巽",
    yao: [0,1,1,1,1,0]
  },
  {
    id: 29, name: "坎", unicode: "\u4DDC", pinyin: "kǎn",
    meaning: "水洊至，习坎。君子以常德行，习教事",
    description: "坎卦象征险陷、困难。双重险难，如水重叠。代表困境、磨炼和超越。",
    judgment: "习坎，有孚，维心亨，行有尚。",
    lines: [
      { position: 1, text: "习坎，入于坎窞，凶。" },
      { position: 2, text: "坎有险，求小得。" },
      { position: 3, text: "来之坎坎，险且枕，入于坎窞，勿用。" },
      { position: 4, text: "樽酒簋贰，用缶，纳约自牖，终无咎。" },
      { position: 5, text: "坎不盈，只既平，无咎。" },
      { position: 6, text: "系用徽纆，寘于丛棘，三岁不得，凶。" },
    ],
    keywords: ["险陷", "困难", "磨炼", "险境", "坚持"],
    modern: {
      career: "面临困难和挑战。保持诚信和坚韧，能够化险为夷。",
      relationship: "感情经历考验，共患难才能见真情。",
      health: "注意肾脏和泌尿系统健康。多喝水但不过量。",
      advice: "艰难困苦，玉汝于成。经历磨难后，你会变得更强大。"
    },
    upperTrigram: "坎", lowerTrigram: "坎",
    yao: [0,1,0,0,1,0]
  },
  {
    id: 30, name: "离", unicode: "\u4DDD", pinyin: "lí",
    meaning: "明两作，离。大人以继明照于四方",
    description: "离卦象征光明、依附、美丽。双重光明，照耀四方。代表文明、智慧、美丽和依赖。",
    judgment: "利贞，亨。畜牝牛吉。",
    lines: [
      { position: 1, text: "履错然，敬之无咎。" },
      { position: 2, text: "黄离，元吉。" },
      { position: 3, text: "日昃之离，不鼓缶而歌，则大耋之嗟，凶。" },
      { position: 4, text: "突如其来如，焚如，死如，弃如。" },
      { position: 5, text: "出涕沱若，戚嗟若，吉。" },
      { position: 6, text: "王用出征，有嘉折首，获匪其丑，无咎。" },
    ],
    keywords: ["光明", "智慧", "美丽", "依附", "文明"],
    modern: {
      career: "发挥智慧和创造力。光明正大的行事，但也要注意与他人的合作。",
      relationship: "感情需要相互依偎，但也不能失去自我。",
      health: "注意心脏和眼睛健康。保持积极乐观的心态。",
      advice: "心中有光，脚下有路。保持智慧和光明的心态，照亮自己也照亮他人。"
    },
    upperTrigram: "离", lowerTrigram: "离",
    yao: [1,0,1,1,0,1]
  },
  {
    id: 31, name: "咸", unicode: "\u4DDE", pinyin: "xián",
    meaning: "山上有泽，咸。君子以虚受人",
    description: "咸卦象征感应、爱情、交流。山上有泽，相互感应。代表两情相悦、心灵沟通。",
    judgment: "亨，利贞。取女吉。",
    lines: [
      { position: 1, text: "咸其拇。" },
      { position: 2, text: "咸其腓，凶，居吉。" },
      { position: 3, text: "咸其股，执其随，往吝。" },
      { position: 4, text: "贞吉悔亡，憧憧往来，朋从尔思。" },
      { position: 5, text: "咸其脢，无悔。" },
      { position: 6, text: "咸其辅颊舌。" },
    ],
    keywords: ["感应", "爱情", "交流", "感动", "心灵"],
    modern: {
      career: "建立良好的人际关系，用心感受市场和客户的需求。",
      relationship: "爱情感应强烈，是表白或增进感情的好时机。心有灵犀一点通。",
      health: "关注与感应相关的神经系统。保持身心舒畅。",
      advice: "用心感受，真诚交流。感应的力量超越语言，直达心灵。"
    },
    upperTrigram: "兑", lowerTrigram: "艮",
    yao: [0,0,1,1,1,0]
  },
  {
    id: 32, name: "恒", unicode: "\u4DDF", pinyin: "héng",
    meaning: "雷风，恒。君子以立不易方",
    description: "恒卦象征恒久、持久。雷风相伴，恒久不变。代表坚持、毅力和永恒。",
    judgment: "亨，无咎，利贞。利有攸往。",
    lines: [
      { position: 1, text: "浚恒，贞凶，无攸利。" },
      { position: 2, text: "悔亡。" },
      { position: 3, text: "不恒其德，或承之羞，贞吝。" },
      { position: 4, text: "田无禽。" },
      { position: 5, text: "恒其德，贞。妇人吉，夫子凶。" },
      { position: 6, text: "振恒，凶。" },
    ],
    keywords: ["恒久", "坚持", "毅力", "永恒", "稳定"],
    modern: {
      career: "持之以恒是成功的关键。选定方向后就要坚持不懈。",
      relationship: "细水长流的感情最珍贵。平平淡淡才是真。",
      health: "坚持规律的锻炼和作息，健康是长期坚持的结果。",
      advice: "滴水穿石，非一日之功。恒心和毅力是成就一切的基础。"
    },
    upperTrigram: "震", lowerTrigram: "巽",
    yao: [0,1,1,1,0,0]
  },
  {
    id: 33, name: "遁", unicode: "\u4DE0", pinyin: "dùn",
    meaning: "天下有山，遁。君子以远小人，不恶而严",
    description: "遁卦象征退避、隐退。天在高处，山在下方，退避之象。代表退让、隐退和策略性撤退。",
    judgment: "亨，小利贞。",
    lines: [
      { position: 1, text: "遁尾，厉，勿用有攸往。" },
      { position: 2, text: "执之用黄牛之革，莫之胜说。" },
      { position: 3, text: "系遁，有疾厉，畜臣妾吉。" },
      { position: 4, text: "好遁，君子吉，小人否。" },
      { position: 5, text: "嘉遁，贞吉。" },
      { position: 6, text: "肥遁，无不利。" },
    ],
    keywords: ["退避", "隐退", "撤退", "避让", "策略"],
    modern: {
      career: "识时务者为俊杰。暂时的退让是为了更好的前进。",
      relationship: "给彼此一些空间，距离产生美。",
      health: "压力过大时适当放松和休息，退一步海阔天空。",
      advice: "知进退，明得失。有时候退一步不是认输，而是为了跳得更远。"
    },
    upperTrigram: "乾", lowerTrigram: "艮",
    yao: [0,0,1,1,1,1]
  },
  {
    id: 34, name: "大壮", unicode: "\u4DE1", pinyin: "dà zhuàng",
    meaning: "雷在天上，大壮。君子以非礼弗履",
    description: "大壮卦象征盛大、强壮。雷在天上轰鸣，气势磅礴。代表力量、壮大和旺盛。",
    judgment: "利贞。",
    lines: [
      { position: 1, text: "壮于趾，征凶，有孚。" },
      { position: 2, text: "贞吉。" },
      { position: 3, text: "小人用壮，君子用罔，贞厉。羝羊触藩，羸其角。" },
      { position: 4, text: "贞吉悔亡，藩决不羸，壮于大舆之輹。" },
      { position: 5, text: "丧羊于易，无悔。" },
      { position: 6, text: "羝羊触藩，不能退，不能遂，无攸利，艰则吉。" },
    ],
    keywords: ["强壮", "盛大", "力量", "旺盛", "气势"],
    modern: {
      career: "事业如日中天，力量充沛。但不可恃强凌弱，要守正。",
      relationship: "热情似火，但不要过于强势。给对方足够的空间。",
      health: "体力充沛，适合高强度训练。但要注意不要过度。",
      advice: "强大之时更需谨慎。恃强凌弱必然招致失败，以德服人才是上策。"
    },
    upperTrigram: "震", lowerTrigram: "乾",
    yao: [1,1,1,1,0,0]
  },
  {
    id: 35, name: "晋", unicode: "\u4DE2", pinyin: "jìn",
    meaning: "明出地上，晋。君子以自昭明德",
    description: "晋卦象征前进、晋升。太阳从大地升起，光明照耀。代表进步、晋升和发展。",
    judgment: "康侯用锡马蕃庶，昼日三接。",
    lines: [
      { position: 1, text: "晋如摧如，独行正，裕无咎。" },
      { position: 2, text: "晋如愁如，贞吉。受兹介福，于其王母。" },
      { position: 3, text: "众允，悔亡。" },
      { position: 4, text: "晋如鼫鼠，贞厉。" },
      { position: 5, text: "悔亡，失得勿恤，往吉无不利。" },
      { position: 6, text: "晋其角，维用伐邑，厉吉无咎，贞吝。" },
    ],
    keywords: ["前进", "晋升", "进步", "发展", "光明"],
    modern: {
      career: "晋升机会来临，努力会被看到。积极进取，前途光明。",
      relationship: "感情不断升温，关系向前发展。",
      health: "身体状态逐步提升，适合开始新的健康计划。",
      advice: "如日之升，光明在前。保持积极进取的态度，前途不可限量。"
    },
    upperTrigram: "离", lowerTrigram: "坤",
    yao: [0,0,0,1,0,1]
  },
  {
    id: 36, name: "明夷", unicode: "\u4DE3", pinyin: "míng yí",
    meaning: "明入地中，明夷。君子以莅众，用晦而明",
    description: "明夷卦象征光明受伤、黑暗。太阳落入地中，光明受损。代表挫折、隐忍和韬光养晦。",
    judgment: "利艰贞。",
    lines: [
      { position: 1, text: "明夷于飞，垂其翼。君子于行，三日不食。有攸往，主人有言。" },
      { position: 2, text: "明夷，夷于左股，用拯马壮，吉。" },
      { position: 3, text: "明夷于南狩，得其大首，不可疾贞。" },
      { position: 4, text: "入于左腹，获明夷之心，于出门庭。" },
      { position: 5, text: "箕子之明夷，利贞。" },
      { position: 6, text: "不明晦，初登于天，后入于地。" },
    ],
    keywords: ["挫折", "隐忍", "黑暗", "韬晦", "耐心"],
    modern: {
      career: "暂时处于低谷，需要忍耐和等待。韬光养晦，积蓄力量。",
      relationship: "感情中有些不顺，需要忍耐和包容。给彼此时间。",
      health: "注意身体发出的警示信号。适当休息和调整。",
      advice: "潜龙勿用。在逆境中保持希望，黑暗之后必是黎明。"
    },
    upperTrigram: "坤", lowerTrigram: "离",
    yao: [1,0,1,0,0,0]
  },
  {
    id: 37, name: "家人", unicode: "\u4DE4", pinyin: "jiā rén",
    meaning: "风自火出，家人。君子以言有物而行有恒",
    description: "家人卦象征家庭、家人。风从火中生出，温暖家园。代表家庭和睦、亲情和归属。",
    judgment: "利女贞。",
    lines: [
      { position: 1, text: "闲有家，悔亡。" },
      { position: 2, text: "无攸遂，在中馈，贞吉。" },
      { position: 3, text: "家人嗃嗃，悔厉吉。妇子嘻嘻，终吝。" },
      { position: 4, text: "富家，大吉。" },
      { position: 5, text: "王假有家，勿恤吉。" },
      { position: 6, text: "有孚威如，终吉。" },
    ],
    keywords: ["家庭", "亲情", "归属", "温暖", "和谐"],
    modern: {
      career: "家庭是事业的坚强后盾。重视工作与生活的平衡。",
      relationship: "家庭和睦是幸福的基石。多花时间陪伴家人。",
      health: "家庭氛围对心理健康影响很大，营造温馨的家庭环境。",
      advice: "家和万事兴。无论事业多成功，都不要忽视家人的重要性。"
    },
    upperTrigram: "巽", lowerTrigram: "离",
    yao: [1,0,1,0,1,1]
  },
  {
    id: 38, name: "睽", unicode: "\u4DE5", pinyin: "kuí",
    meaning: "上火下泽，睽。君子以同而异",
    description: "睽卦象征背离、分歧。火在上、泽在下，相互背离。代表分歧、差异和求同存异。",
    judgment: "小事吉。",
    lines: [
      { position: 1, text: "悔亡。丧马勿逐，自复。见恶人无咎。" },
      { position: 2, text: "遇主于巷，无咎。" },
      { position: 3, text: "见舆曳，其牛掣，其人天且劓，无初有终。" },
      { position: 4, text: "睽孤，遇元夫，交孚，厉无咎。" },
      { position: 5, text: "悔亡，厥宗噬肤，往何咎。" },
      { position: 6, text: "睽孤，见豕负涂，载鬼一车，先张之弧，后说之弧，匪寇婚媾，往遇雨则吉。" },
    ],
    keywords: ["分歧", "背离", "差异", "求同存异", "对立"],
    modern: {
      career: "意见不合是常态。求同存异，寻找共同利益点。",
      relationship: "差异不可怕，尊重彼此的不同。在分歧中寻找理解。",
      health: "注意左右身体的不平衡，协调运动。",
      advice: "君子和而不同。尊重差异，在分歧中找到共识才是智慧。"
    },
    upperTrigram: "离", lowerTrigram: "兑",
    yao: [1,1,0,1,0,1]
  },
  {
    id: 39, name: "蹇", unicode: "\u4DE6", pinyin: "jiǎn",
    meaning: "山上有水，蹇。君子以反身修德",
    description: "蹇卦象征艰难、跛足。山上有水，行路艰难。代表困境、阻碍和反思。",
    judgment: "利西南，不利东北。利见大人，贞吉。",
    lines: [
      { position: 1, text: "往蹇来誉。" },
      { position: 2, text: "王臣蹇蹇，匪躬之故。" },
      { position: 3, text: "往蹇来反。" },
      { position: 4, text: "往蹇来连。" },
      { position: 5, text: "大蹇朋来。" },
      { position: 6, text: "往蹇来硕，吉。利见大人。" },
    ],
    keywords: ["艰难", "困境", "阻碍", "反思", "修德"],
    modern: {
      career: "前路艰难，不宜冒进。反躬自省，提升自己再出发。",
      relationship: "感情遇到阻力，需要双方共同努力。寻求朋友或长辈的建议。",
      health: "行动不便或身体沉重，注意关节和骨骼健康。",
      advice: "行路艰难时，不妨停下来反思。修身养性，柳暗花明又一村。"
    },
    upperTrigram: "坎", lowerTrigram: "艮",
    yao: [0,0,1,0,1,0]
  },
  {
    id: 40, name: "解", unicode: "\u4DE7", pinyin: "xiè",
    meaning: "雷雨作，解。君子以赦过宥罪",
    description: "解卦象征解脱、缓解。雷雨大作，万物苏解。代表危机解除、问题解决和释放。",
    judgment: "利西南。无所往，其来复吉。有攸往，夙吉。",
    lines: [
      { position: 1, text: "无咎。" },
      { position: 2, text: "田获三狐，得黄矢，贞吉。" },
      { position: 3, text: "负且乘，致寇至，贞吝。" },
      { position: 4, text: "解而拇，朋至斯孚。" },
      { position: 5, text: "君子维有解，吉。有孚于小人。" },
      { position: 6, text: "公用射隼于高墉之上，获之，无不利。" },
    ],
    keywords: ["解脱", "解决", "释放", "缓解", "自由"],
    modern: {
      career: "问题即将解决，困境即将过去。抓住机会快速行动。",
      relationship: "误会和矛盾即将化解。主动沟通，冰释前嫌。",
      health: "病情好转，身体逐渐恢复。",
      advice: "问题总有解决的一天。保持信心，果断行动，阴霾终将散去。"
    },
    upperTrigram: "震", lowerTrigram: "坎",
    yao: [0,1,0,1,0,0]
  },
  {
    id: 41, name: "损", unicode: "\u4DE8", pinyin: "sǔn",
    meaning: "山下有泽，损。君子以惩忿窒欲",
    description: "损卦象征减损、损失。泽在山下，损下益上。代表损失、克制和牺牲。",
    judgment: "有孚，元吉，无咎，可贞，利有攸往。曷之用？二簋可用享。",
    lines: [
      { position: 1, text: "已事遄往，无咎，酌损之。" },
      { position: 2, text: "利贞，征凶，弗损益之。" },
      { position: 3, text: "三人行，则损一人。一人行，则得其友。" },
      { position: 4, text: "损其疾，使遄有喜，无咎。" },
      { position: 5, text: "或益之十朋之龟，弗克违，元吉。" },
      { position: 6, text: "弗损益之，无咎，贞吉，利有攸往，得臣无家。" },
    ],
    keywords: ["损失", "减损", "克制", "牺牲", "节俭"],
    modern: {
      career: "可能需要放弃一些东西才能获得更大的收益。舍小保大。",
      relationship: "感情中需要互相妥协和包容。有舍才有得。",
      health: "戒除不良嗜好，减少不必要的消耗。",
      advice: "有所失必有所得。舍得舍得，有舍才有得。"
    },
    upperTrigram: "艮", lowerTrigram: "兑",
    yao: [1,1,0,0,0,1]
  },
  {
    id: 42, name: "益", unicode: "\u4DE9", pinyin: "yì",
    meaning: "风雷，益。君子以见善则迁，有过则改",
    description: "益卦象征增益、利益。风雷相助，增长受益。代表获得、成长和互助。",
    judgment: "利有攸往，利涉大川。",
    lines: [
      { position: 1, text: "利用为大作，元吉，无咎。" },
      { position: 2, text: "或益之十朋之龟，弗克违，永贞吉。王用享于帝，吉。" },
      { position: 3, text: "益之用凶事，无咎。有孚中行，告公用圭。" },
      { position: 4, text: "中行，告公从。利用为依迁国。" },
      { position: 5, text: "有孚惠心，勿问元吉。有孚惠我德。" },
      { position: 6, text: "莫益之，或击之，立心勿恒，凶。" },
    ],
    keywords: ["增益", "利益", "成长", "互助", "受益"],
    modern: {
      career: "好运来临，事业增益。把握机会，可以大胆投资和扩张。",
      relationship: "感情得到滋养和成长。为对方付出就是为自己积福。",
      health: "身体状况提升。见善则迁，改善生活习惯。",
      advice: "得道多助。善行和正直会给你带来意想不到的收获。"
    },
    upperTrigram: "巽", lowerTrigram: "震",
    yao: [1,0,0,0,1,1]
  },
  {
    id: 43, name: "夬", unicode: "\u4DEA", pinyin: "guài",
    meaning: "泽上于天，夬。君子以施禄及下，居德则忌",
    description: "夬卦象征决断、果决。泽水蒸发上天，决然而下。代表决断、果断和清除。",
    judgment: "扬于王庭，孚号有厉。告自邑，不利即戎。利有攸往。",
    lines: [
      { position: 1, text: "壮于前趾，往不胜为咎。" },
      { position: 2, text: "惕号，莫夜有戎，勿恤。" },
      { position: 3, text: "壮于頄，有凶。君子夬夬，独行遇雨，若濡有愠，无咎。" },
      { position: 4, text: "臀无肤，其行次且。牵羊悔亡，闻言不信。" },
      { position: 5, text: "苋陆夬夬，中行无咎。" },
      { position: 6, text: "无号，终有凶。" },
    ],
    keywords: ["决断", "果断", "清除", "决策", "果敢"],
    modern: {
      career: "需要做出重要决策。果断行动，不要犹豫不决。",
      relationship: "当断则断，拖延只会让感情问题更加复杂。",
      health: "外科手术或果断的治疗方案。长痛不如短痛。",
      advice: "当断不断，反受其乱。关键时刻需要勇气和决断力。"
    },
    upperTrigram: "兑", lowerTrigram: "乾",
    yao: [1,1,1,1,1,0]
  },
  {
    id: 44, name: "姤", unicode: "\u4DEB", pinyin: "gòu",
    meaning: "天下有风，姤。后以施命诰四方",
    description: "姤卦象征相遇、邂逅。风行天下，不期而遇。代表偶然相遇、机缘和沟通。",
    judgment: "女壮，勿用取女。",
    lines: [
      { position: 1, text: "系于金柅，贞吉。有攸往，见凶。羸豕孚蹢躅。" },
      { position: 2, text: "包有鱼，无咎，不利宾。" },
      { position: 3, text: "臀无肤，其行次且，厉，无大咎。" },
      { position: 4, text: "包无鱼，起凶。" },
      { position: 5, text: "以杞包瓜，含章，有陨自天。" },
      { position: 6, text: "姤其角，吝，无咎。" },
    ],
    keywords: ["相遇", "邂逅", "机缘", "沟通", "意外"],
    modern: {
      career: "意外的人际交往可能带来新的商业机会。保持开放心态。",
      relationship: "浪漫的邂逅可能发生。一见钟情不是传说。",
      health: "注意传染性疾病，意外的小伤需要及时处理。",
      advice: "缘分天注定。保持开放的心态，美好的相遇可能就在下一个转角。"
    },
    upperTrigram: "乾", lowerTrigram: "巽",
    yao: [0,1,1,1,1,1]
  },
  {
    id: 45, name: "萃", unicode: "\u4DEC", pinyin: "cuì",
    meaning: "泽上于地，萃。君子以除戎器，戒不虞",
    description: "萃卦象征聚集、荟萃。泽水汇聚于大地之上。代表人才聚集、团队凝聚和盛会。",
    judgment: "亨。王假有庙。利见大人，亨，利贞。用大牲吉，利有攸往。",
    lines: [
      { position: 1, text: "有孚不终，乃乱乃萃，若号，一握为笑，勿恤，往无咎。" },
      { position: 2, text: "引吉，无咎，孚乃利用禴。" },
      { position: 3, text: "萃如嗟如，无攸利。往无咎，小吝。" },
      { position: 4, text: "大吉，无咎。" },
      { position: 5, text: "萃有位，无咎。匪孚，元永贞，悔亡。" },
      { position: 6, text: "赍咨涕洟，无咎。" },
    ],
    keywords: ["聚集", "荟萃", "团队", "凝聚", "盛会"],
    modern: {
      career: "人才汇聚，团队力量强大。适合召开会议或建立合作。",
      relationship: "社交活动中可能遇到志同道合的人。扩大社交圈。",
      health: "注意聚集性场所的卫生。集体活动有益心理健康。",
      advice: "物以类聚，人以群分。聚集正能量的人和环境，你会变得更好。"
    },
    upperTrigram: "兑", lowerTrigram: "坤",
    yao: [0,0,0,1,1,0]
  },
  {
    id: 46, name: "升", unicode: "\u4DED", pinyin: "shēng",
    meaning: "地中生木，升。君子以顺德，积小以高大",
    description: "升卦象征上升、成长。树木从大地中生长，节节攀升。代表晋升、发展和进步。",
    judgment: "元亨。用见大人，勿恤。南征吉。",
    lines: [
      { position: 1, text: "允升，大吉。" },
      { position: 2, text: "孚乃利用禴，无咎。" },
      { position: 3, text: "升虚邑。" },
      { position: 4, text: "王用亨于岐山，吉无咎。" },
      { position: 5, text: "贞吉升阶。" },
      { position: 6, text: "冥升，利于不息之贞。" },
    ],
    keywords: ["上升", "成长", "晋升", "发展", "进步"],
    modern: {
      career: "事业稳步上升，晋升机会到来。积小胜为大胜。",
      relationship: "感情稳步升温。一步一个脚印地走向幸福。",
      health: "身体状况持续改善。坚持就是胜利。",
      advice: "千里之行，始于足下。持续不断的努力终将带你到达高处。"
    },
    upperTrigram: "坤", lowerTrigram: "巽",
    yao: [0,1,1,0,0,0]
  },
  {
    id: 47, name: "困", unicode: "\u4DEE", pinyin: "kùn",
    meaning: "泽无水，困。君子以致命遂志",
    description: "困卦象征困境、穷困。泽中无水，干涸困顿。代表困难、考验和坚守。",
    judgment: "亨。贞，大人吉，无咎。有言不信。",
    lines: [
      { position: 1, text: "臀困于株木，入于幽谷，三岁不觌。" },
      { position: 2, text: "困于酒食，朱绂方来，利用享祀。征凶，无咎。" },
      { position: 3, text: "困于石，据于蒺藜，入于其宫，不见其妻，凶。" },
      { position: 4, text: "来徐徐，困于金车，吝，有终。" },
      { position: 5, text: "劓刖，困于赤绂。乃徐有说，利用祭祀。" },
      { position: 6, text: "困于葛藟，于臲卼，曰动悔有悔，征吉。" },
    ],
    keywords: ["困境", "考验", "坚守", "忍耐", "希望"],
    modern: {
      career: "事业遇到困难，资金或资源紧张。坚守本分，等待转机。",
      relationship: "感情生活有些压抑。需要坦诚沟通，共同面对。",
      health: "身体虚弱或能量不足。注意休息和营养补充。",
      advice: "君子固穷，小人穷斯滥矣。在困境中保持操守和希望。"
    },
    upperTrigram: "兑", lowerTrigram: "坎",
    yao: [0,1,0,1,1,0]
  },
  {
    id: 48, name: "井", unicode: "\u4DEF", pinyin: "jǐng",
    meaning: "木上有水，井。君子以劳民劝相",
    description: "井卦象征源泉、滋养。木上有水，井水滋养。代表资源、源泉和奉献。",
    judgment: "改邑不改井，无丧无得，往来井井。汔至亦未繘井，羸其瓶，凶。",
    lines: [
      { position: 1, text: "井泥不食，旧井无禽。" },
      { position: 2, text: "井谷射鲋，瓮敝漏。" },
      { position: 3, text: "井渫不食，为我心恻，可用汲。王明并受其福。" },
      { position: 4, text: "井甃，无咎。" },
      { position: 5, text: "井洌，寒泉食。" },
      { position: 6, text: "井收勿幕，有孚元吉。" },
    ],
    keywords: ["源泉", "资源", "滋养", "奉献", "恒久"],
    modern: {
      career: "你拥有宝贵的资源或技能。不要吝啬分享，帮助他人就是帮助自己。",
      relationship: "感情需要不断注入新的活力。保持新鲜感。",
      health: "注意水源和饮食卫生。多喝水，保持身体水分。",
      advice: "源源不断的给予才是真正的富足。做一个滋养他人的人。"
    },
    upperTrigram: "坎", lowerTrigram: "巽",
    yao: [0,1,1,0,1,0]
  },
  {
    id: 49, name: "革", unicode: "\u4DF0", pinyin: "gé",
    meaning: "泽中有火，革。君子以治历明时",
    description: "革卦象征变革、革新。泽中有火，水火相克生变。代表革命、改革和变革。",
    judgment: "巳日乃孚。元亨利贞，悔亡。",
    lines: [
      { position: 1, text: "巩用黄牛之革。" },
      { position: 2, text: "巳日乃革之，征吉，无咎。" },
      { position: 3, text: "征凶，贞厉。革言三就，有孚。" },
      { position: 4, text: "悔亡。有孚改命，吉。" },
      { position: 5, text: "大人虎变，未占有孚。" },
      { position: 6, text: "君子豹变，小人革面，征凶，居贞吉。" },
    ],
    keywords: ["变革", "革新", "改革", "改变", "创新"],
    modern: {
      career: "行业或岗位面临重大变革。拥抱变化，在变革中找到新机会。",
      relationship: "感情需要新的模式。打破旧习惯，创造新体验。",
      health: "需要改变不良生活习惯。戒掉坏习惯是健康的开始。",
      advice: "穷则变，变则通。拥抱变化，在变革中重生。"
    },
    upperTrigram: "兑", lowerTrigram: "离",
    yao: [1,0,1,1,1,0]
  },
  {
    id: 50, name: "鼎", unicode: "\u4DF1", pinyin: "dǐng",
    meaning: "木上有火，鼎。君子以正位凝命",
    description: "鼎卦象征鼎立、烹饪、创新。木生火以烹饪，鼎立四方。代表创造、新事物和稳定。",
    judgment: "元吉，亨。",
    lines: [
      { position: 1, text: "鼎颠趾，利出否。得妾以其子，无咎。" },
      { position: 2, text: "鼎有实，我仇有疾，不我能即，吉。" },
      { position: 3, text: "鼎耳革，其行塞，雉膏不食，方雨亏悔，终吉。" },
      { position: 4, text: "鼎折足，覆公餗，其形渥，凶。" },
      { position: 5, text: "鼎黄耳金铉，利贞。" },
      { position: 6, text: "鼎玉铉，大吉，无不利。" },
    ],
    keywords: ["鼎立", "创新", "创造", "稳定", "烹饪"],
    modern: {
      career: "适合创业或推出新产品。稳固基础，创新求变。",
      relationship: "建立稳定而温馨的家庭。共同创造美好生活。",
      health: "注意饮食健康。均衡营养是健康的基础。",
      advice: "革故鼎新。在稳固的基础上创新，才能立于不败之地。"
    },
    upperTrigram: "离", lowerTrigram: "巽",
    yao: [0,1,1,1,0,1]
  },
  {
    id: 51, name: "震", unicode: "\u4DF2", pinyin: "zhèn",
    meaning: "洊雷，震。君子以恐惧修省",
    description: "震卦象征震惊、震动。雷霆万钧，震惊百里。代表突发事件、警醒和震撼。",
    judgment: "亨。震来虩虩，笑言哑哑。震惊百里，不丧匕鬯。",
    lines: [
      { position: 1, text: "震来虩虩，后笑言哑哑，吉。" },
      { position: 2, text: "震来厉，亿丧贝，跻于九陵，勿逐，七日得。" },
      { position: 3, text: "震苏苏，震行无眚。" },
      { position: 4, text: "震遂泥。" },
      { position: 5, text: "震往来厉，亿无丧，有事。" },
      { position: 6, text: "震索索，视矍矍，征凶。震不于其躬，于其邻，无咎。婚媾有言。" },
    ],
    keywords: ["震惊", "警醒", "震动", "突发", "危机"],
    modern: {
      career: "可能面临突发变化或危机。保持冷静，危机中也有转机。",
      relationship: "突如其来的消息可能影响感情。冷静沟通最重要。",
      health: "注意安全，防止意外事故。保持警觉。",
      advice: "临危不乱。真正的强者在震动中依然能够保持镇定。"
    },
    upperTrigram: "震", lowerTrigram: "震",
    yao: [1,0,0,1,0,0]
  },
  {
    id: 52, name: "艮", unicode: "\u4DF3", pinyin: "gèn",
    meaning: "兼山，艮。君子以思不出其位",
    description: "艮卦象征停止、静止。两山重叠，稳重静止。代表安静、反思和适可而止。",
    judgment: "艮其背，不获其身。行其庭，不见其人。无咎。",
    lines: [
      { position: 1, text: "艮其趾，无咎，利永贞。" },
      { position: 2, text: "艮其腓，不拯其随，其心不快。" },
      { position: 3, text: "艮其限，列其夤，厉薰心。" },
      { position: 4, text: "艮其身，无咎。" },
      { position: 5, text: "艮其辅，言有序，悔亡。" },
      { position: 6, text: "敦艮，吉。" },
    ],
    keywords: ["停止", "静止", "反思", "安静", "知止"],
    modern: {
      career: "暂时停止扩张，做好内功。反思和规划比盲目行动更重要。",
      relationship: "给感情一些安静的空间。有时候不说话比说话更好。",
      health: "静养休息，冥想和瑜伽有助于身心健康。",
      advice: "知止而后有定。懂得何时停止，比知道何时前进更重要。"
    },
    upperTrigram: "艮", lowerTrigram: "艮",
    yao: [0,0,1,0,0,1]
  },
  {
    id: 53, name: "渐", unicode: "\u4DF4", pinyin: "jiàn",
    meaning: "山上有木，渐。君子以居贤德善俗",
    description: "渐卦象征渐进、渐進。山上有木，慢慢生长。代表渐進、循序和稳步发展。",
    judgment: "女归吉，利贞。",
    lines: [
      { position: 1, text: "鸿渐于干，小子厉，有言，无咎。" },
      { position: 2, text: "鸿渐于磐，饮食衎衎，吉。" },
      { position: 3, text: "鸿渐于陆，夫征不复，妇孕不育，凶。利御寇。" },
      { position: 4, text: "鸿渐于木，或得其桷，无咎。" },
      { position: 5, text: "鸿渐于陵，妇三岁不孕，终莫之胜，吉。" },
      { position: 6, text: "鸿渐于逵，其羽可用为仪，吉。" },
    ],
    keywords: ["渐进", "循序", "稳步", "发展", "积累"],
    modern: {
      career: "稳步前进，不要急于求成。循序渐进才能走得更远。",
      relationship: "感情慢慢培养，水到渠成。欲速则不达。",
      health: "逐步改善身体状况。每天进步一点点。",
      advice: "欲速则不达。一步一个脚印，慢慢来比较快。"
    },
    upperTrigram: "巽", lowerTrigram: "艮",
    yao: [0,0,1,0,1,1]
  },
  {
    id: 54, name: "归妹", unicode: "\u4DF5", pinyin: "guī mèi",
    meaning: "泽上有雷，归妹。君子以永终知敝",
    description: "归妹卦象征结合、婚嫁。泽上有雷，婚嫁之象。代表结合、婚姻和结局。",
    judgment: "征凶，无攸利。",
    lines: [
      { position: 1, text: "归妹以娣，跛能履，征吉。" },
      { position: 2, text: "眇能视，利幽人之贞。" },
      { position: 3, text: "归妹以须，反归以娣。" },
      { position: 4, text: "归妹愆期，迟归有时。" },
      { position: 5, text: "帝乙归妹，其君之袂不如其娣之袂良。月几望，吉。" },
      { position: 6, text: "女承筐无实，士刲羊无血，无攸利。" },
    ],
    keywords: ["结合", "婚姻", "归宿", "结局", "匹配"],
    modern: {
      career: "寻找合适的合作伙伴或并购机会。匹配度决定成败。",
      relationship: "婚姻或长期关系的重要决策。考虑长远未来。",
      health: "注意生殖系统和内分泌健康。",
      advice: "好的开始固然重要，但好的结局更需要用心经营。"
    },
    upperTrigram: "震", lowerTrigram: "兑",
    yao: [1,1,0,1,0,0]
  },
  {
    id: 55, name: "丰", unicode: "\u4DF6", pinyin: "fēng",
    meaning: "雷电皆至，丰。君子以折狱致刑",
    description: "丰卦象征丰盛、盛大。雷电交加，声势浩大。代表丰收、繁荣和鼎盛。",
    judgment: "亨。王假之，勿忧，宜日中。",
    lines: [
      { position: 1, text: "遇其配主，虽旬无咎，往有尚。" },
      { position: 2, text: "丰其蔀，日中见斗，往得疑疾，有孚发若，吉。" },
      { position: 3, text: "丰其沛，日中见沬，折其右肱，无咎。" },
      { position: 4, text: "丰其蔀，日中见斗，遇其夷主，吉。" },
      { position: 5, text: "来章，有庆誉，吉。" },
      { position: 6, text: "丰其屋，蔀其家，窥其户，阒其无人，三岁不觌，凶。" },
    ],
    keywords: ["丰盛", "繁荣", "鼎盛", "丰收", "盛大"],
    modern: {
      career: "事业处于鼎盛时期。抓住机会，但不要得意忘形。",
      relationship: "感情生活丰富多彩。享受美好时光。",
      health: "身体状态极佳。保持良好习惯，防止乐极生悲。",
      advice: "盛极必衰，居安思危。在鼎盛时期要为未来做好规划。"
    },
    upperTrigram: "震", lowerTrigram: "离",
    yao: [1,0,1,1,0,0]
  },
  {
    id: 56, name: "旅", unicode: "\u4DF7", pinyin: "lǚ",
    meaning: "山上有火，旅。君子以明慎用刑而不留狱",
    description: "旅卦象征旅行、漂泊。山上有火，旅人夜宿。代表旅行、变动和暂时。",
    judgment: "小亨。旅贞吉。",
    lines: [
      { position: 1, text: "旅琐琐，斯其所取灾。" },
      { position: 2, text: "旅即次，怀其资，得童仆贞。" },
      { position: 3, text: "旅焚其次，丧其童仆，贞厉。" },
      { position: 4, text: "旅于处，得其资斧，我心不快。" },
      { position: 5, text: "射雉一矢亡，终以誉命。" },
      { position: 6, text: "鸟焚其巢，旅人先笑后号咷。丧牛于易，凶。" },
    ],
    keywords: ["旅行", "变动", "漂泊", "暂时", "探索"],
    modern: {
      career: "出差或工作调动。适应新环境是挑战也是机会。",
      relationship: "异地恋或旅途中的邂逅。距离考验真感情。",
      health: "注意出行安全和时差调整。旅途劳顿需要休息。",
      advice: "人生如旅，随遇而安。保持开放心态，享受每一段旅程。"
    },
    upperTrigram: "离", lowerTrigram: "艮",
    yao: [0,0,1,1,0,1]
  },
  {
    id: 57, name: "巽", unicode: "\u4DF8", pinyin: "xùn",
    meaning: "随风，巽。君子以申命行事",
    description: "巽卦象征顺入、谦逊。风行草偃，无孔不入。代表顺从、渗透和沟通。",
    judgment: "小亨。利有攸往，利见大人。",
    lines: [
      { position: 1, text: "进退，利武人之贞。" },
      { position: 2, text: "巽在床下，用史巫纷若，吉无咎。" },
      { position: 3, text: "频巽，吝。" },
      { position: 4, text: "悔亡，田获三品。" },
      { position: 5, text: "贞吉，悔亡，无不利。无初有终。先庚三日，后庚三日，吉。" },
      { position: 6, text: "巽在床下，丧其资斧，贞凶。" },
    ],
    keywords: ["顺入", "谦逊", "渗透", "沟通", "灵活"],
    modern: {
      career: "以柔克刚，含蓄渗透。沟通和协调比强硬手段更有效。",
      relationship: "温和谦逊的态度更能赢得人心。随风潜入夜，润物细无声。",
      health: "注意呼吸系统和风邪。保持室内通风。",
      advice: "上善若水。柔和谦逊的力量，可以穿透最坚硬的障碍。"
    },
    upperTrigram: "巽", lowerTrigram: "巽",
    yao: [0,1,1,0,1,1]
  },
  {
    id: 58, name: "兑", unicode: "\u4DF9", pinyin: "duì",
    meaning: "丽泽，兑。君子以朋友讲习",
    description: "兑卦象征喜悦、言说。两泽相连，互相滋润。代表快乐、交流和友谊。",
    judgment: "亨，利贞。",
    lines: [
      { position: 1, text: "和兑，吉。" },
      { position: 2, text: "孚兑，吉，悔亡。" },
      { position: 3, text: "来兑，凶。" },
      { position: 4, text: "商兑未宁，介疾有喜。" },
      { position: 5, text: "孚于剥，有厉。" },
      { position: 6, text: "引兑。" },
    ],
    keywords: ["喜悦", "交流", "言说", "快乐", "友谊"],
    modern: {
      career: "良好的人际关系和愉快的合作氛围。沟通带来商机。",
      relationship: "甜蜜快乐，和颜悦色的相处让感情升温。",
      health: "保持心情愉快是最好的养生。多笑一笑。",
      advice: "赠人玫瑰，手有余香。分享快乐会让快乐加倍。"
    },
    upperTrigram: "兑", lowerTrigram: "兑",
    yao: [1,1,0,1,1,0]
  },
  {
    id: 59, name: "涣", unicode: "\u4DFA", pinyin: "huàn",
    meaning: "风行水上，涣。先王以享于帝立庙",
    description: "涣卦象征涣散、离散。风行水上，波澜消散。代表散开、解除和释放。",
    judgment: "亨。王假有庙。利涉大川，利贞。",
    lines: [
      { position: 1, text: "用拯马壮，吉。" },
      { position: 2, text: "涣奔其机，悔亡。" },
      { position: 3, text: "涣其躬，无悔。" },
      { position: 4, text: "涣其群，元吉。涣有丘，匪夷所思。" },
      { position: 5, text: "涣汗其大号，涣王居，无咎。" },
      { position: 6, text: "涣其血，去逖出，无咎。" },
    ],
    keywords: ["涣散", "解除", "释放", "散开", "解脱"],
    modern: {
      career: "团队或组织的调整重组。解散旧的，组建新的。",
      relationship: "聚散离合是常态。如果缘分尽了，就好聚好散。",
      health: "身体的毒素需要排出。多喝水，加速新陈代谢。",
      advice: "天下没有不散的筵席。懂得放手，才能迎接新的开始。"
    },
    upperTrigram: "巽", lowerTrigram: "坎",
    yao: [0,1,0,0,1,1]
  },
  {
    id: 60, name: "节", unicode: "\u4DFB", pinyin: "jié",
    meaning: "泽上有水，节。君子以制数度，议德行",
    description: "节卦象征节制、节度。泽上有水，满溢为患。代表节制、规范和适度。",
    judgment: "亨。苦节不可贞。",
    lines: [
      { position: 1, text: "不出户庭，无咎。" },
      { position: 2, text: "不出门庭，凶。" },
      { position: 3, text: "不节若，则嗟若，无咎。" },
      { position: 4, text: "安节，亨。" },
      { position: 5, text: "甘节，吉。往有尚。" },
      { position: 6, text: "苦节，贞凶，悔亡。" },
    ],
    keywords: ["节制", "适度", "规范", "自律", "规则"],
    modern: {
      career: "控制成本，规范管理。节制是长久发展的关键。",
      relationship: "感情中要有适度的空间和界限。过度的束缚反而会失去。",
      health: "饮食有节，起居有常。节制是最好的养生之道。",
      advice: "过犹不及。凡事有度，过度的节制和放纵都是伤害。"
    },
    upperTrigram: "坎", lowerTrigram: "兑",
    yao: [1,1,0,0,1,0]
  },
  {
    id: 61, name: "中孚", unicode: "\u4DFC", pinyin: "zhōng fú",
    meaning: "泽上有风，中孚。君子以议狱缓死",
    description: "中孚卦象征内心诚信。泽上有风，诚信感化万物。代表真诚、信任和感化。",
    judgment: "豚鱼吉。利涉大川，利贞。",
    lines: [
      { position: 1, text: "虞吉，有它不燕。" },
      { position: 2, text: "鸣鹤在阴，其子和之。我有好爵，吾与尔靡之。" },
      { position: 3, text: "得敌，或鼓或罢，或泣或歌。" },
      { position: 4, text: "月几望，马匹亡，无咎。" },
      { position: 5, text: "有孚挛如，无咎。" },
      { position: 6, text: "翰音登于天，贞凶。" },
    ],
    keywords: ["诚信", "信任", "真诚", "感化", "信誉"],
    modern: {
      career: "诚信是最大的资本。以诚待人，信誉至上。",
      relationship: "信任是感情的根基。以真心换真心。",
      health: "内心的平和与诚信有助于身心健康。问心无愧最安乐。",
      advice: "精诚所至，金石为开。诚信是最好的通行证。"
    },
    upperTrigram: "巽", lowerTrigram: "兑",
    yao: [1,1,0,0,1,1]
  },
  {
    id: 62, name: "小过", unicode: "\u4DFD", pinyin: "xiǎo guò",
    meaning: "山上有雷，小过。君子以行过乎恭，丧过乎哀",
    description: "小过卦象征小过失、小超越。雷在山上，声音略过。代表小的偏差、谨慎和调整。",
    judgment: "亨，利贞。可小事，不可大事。飞鸟遗之音，不宜上，宜下，大吉。",
    lines: [
      { position: 1, text: "飞鸟以凶。" },
      { position: 2, text: "过其祖，遇其妣。不及其君，遇其臣。无咎。" },
      { position: 3, text: "弗过防之，从或戕之，凶。" },
      { position: 4, text: "无咎，弗过遇之。往厉必戒，勿用永贞。" },
      { position: 5, text: "密云不雨，自我西郊。公弋取彼在穴。" },
      { position: 6, text: "弗遇过之，飞鸟离之，凶，是谓灾眚。" },
    ],
    keywords: ["小过失", "谨慎", "调整", "细节", "谦卑"],
    modern: {
      career: "注意细节，小错可能酿成大祸。做事要更加谨慎。",
      relationship: "小误会要及时化解。不要让小问题积累成大矛盾。",
      health: "小病要及时治疗。不要忽视身体的微小信号。",
      advice: "千里之堤，溃于蚁穴。关注细节，防微杜渐。"
    },
    upperTrigram: "震", lowerTrigram: "艮",
    yao: [0,0,1,1,0,0]
  },
  {
    id: 63, name: "既济", unicode: "\u4DFE", pinyin: "jì jì",
    meaning: "水在火上，既济。君子以思患而豫防之",
    description: "既济卦象征已完成、成功。水在火上，烹饪完成。代表事成、圆满和完成。",
    judgment: "亨小，利贞。初吉终乱。",
    lines: [
      { position: 1, text: "曳其轮，濡其尾，无咎。" },
      { position: 2, text: "妇丧其茀，勿逐，七日得。" },
      { position: 3, text: "高宗伐鬼方，三年克之，小人勿用。" },
      { position: 4, text: "繻有衣袽，终日戒。" },
      { position: 5, text: "东邻杀牛，不如西邻之禴祭，实受其福。" },
      { position: 6, text: "濡其首，厉。" },
    ],
    keywords: ["成功", "完成", "圆满", "成就", "预防"],
    modern: {
      career: "项目或任务即将成功完成。庆祝之余要防范新的风险。",
      relationship: "修成正果，功德圆满。但婚姻不是终点，而是新的开始。",
      health: "大病初愈，注意防止复发。",
      advice: "成功不是终点，而是新的起点。居安思危方能长久。"
    },
    upperTrigram: "坎", lowerTrigram: "离",
    yao: [1,0,1,0,1,0]
  },
  {
    id: 64, name: "未济", unicode: "\u4DFF", pinyin: "wèi jì",
    meaning: "火在水上，未济。君子以慎辨物居方",
    description: "未济卦象征未完成、继续。火在水上，未能相济。代表未竟、希望和新的开始。",
    judgment: "亨。小狐汔济，濡其尾，无攸利。",
    lines: [
      { position: 1, text: "濡其尾，吝。" },
      { position: 2, text: "曳其轮，贞吉。" },
      { position: 3, text: "未济，征凶。利涉大川。" },
      { position: 4, text: "贞吉悔亡，震用伐鬼方，三年有赏于大国。" },
      { position: 5, text: "贞吉无悔，君子之光，有孚，吉。" },
      { position: 6, text: "有孚于饮酒，无咎。濡其首，有孚失是。" },
    ],
    keywords: ["未完成", "希望", "继续", "新开始", "进取"],
    modern: {
      career: "事情还未完成，继续努力。新的机会在等待着你。",
      relationship: "感情还有发展空间。不要放弃，好事多磨。",
      health: "康复中，需要继续调养。坚持就是胜利。",
      advice: "革命尚未成功，同志仍需努力。未完成意味着还有无限可能。"
    },
    upperTrigram: "离", lowerTrigram: "坎",
    yao: [0,1,0,1,0,1]
  }
];

export default hexagrams;

export function getHexagramById(id) {
  return hexagrams.find(h => h.id === id);
}

export function getHexagramByYao(yao) {
  return hexagrams.find(h => {
    if (h.yao.length !== yao.length) return false;
    return h.yao.every((v, i) => v === yao[i]);
  });
}

export function getDailyHexagram() {
  const today = new Date();
  const dateKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    const char = dateKey.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  const index = Math.abs(hash) % 64;
  return hexagrams[index];
}

export function formatYao(yin) {
  return yin ? '\u2572\u2571' : '\u4DC0';
}