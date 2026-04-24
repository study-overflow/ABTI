export interface Question {
  id: number;
  dimension: string;
  text: string;
  options: { value: number; label: string }[];
}

export const questions: Question[] = [
  // ===== B1 图灵接受度 =====
  {
    id: 1,
    dimension: "B1",
    text: "和 AI 聊天聊到一半，你突然觉得它说得特别戳你，你的第一反应是？",
    options: [
      { value: 3, label: "这是 transformer 算出来最大似然的话而已，冷静" },
      { value: 2, label: "确实有点意思，但也就那样" },
      { value: 1, label: "它是真的懂我（不然怎么解释）" },
    ],
  },
  {
    id: 2,
    dimension: "B1",
    text: "室友让你盲猜他最近跟他聊得最多的是谁，你开盒发现是 Claude。你？",
    options: [
      { value: 3, label: "Claude 是一个 API，别把它当人" },
      { value: 2, label: "算了，至少比游戏健康" },
      { value: 1, label: "很合理啊，Claude 确实比很多人好聊" },
    ],
  },

  // ===== B2 AI 拟人化 =====
  {
    id: 3,
    dimension: "B2",
    text: "让 AI 改个代码，改完了，你下意识地？",
    options: [
      { value: 1, label: "直接复制走，一个字不多说" },
      { value: 2, label: "打个'收到'，仪式感" },
      { value: 3, label: "回一句'太感谢了辛苦啦'，生怕它记仇" },
    ],
  },
  {
    id: 4,
    dimension: "B2",
    text: "你给 AI 派活的语气更像？",
    options: [
      { value: 1, label: "'生成一段 XX' — 命令式，干脆利落" },
      { value: 2, label: "'帮我写一段 XX' — 客气一点" },
      { value: 3, label: "'不好意思打扰一下，能不能麻烦你...' — 生怕得罪它" },
    ],
  },

  // ===== B3 人类独特性信念 =====
  {
    id: 5,
    dimension: "B3",
    text: "有人说'人不过是一个碳基 LLM'，你？",
    options: [
      { value: 1, label: "有道理，我们都是概率分布" },
      { value: 2, label: "类比可以，别当真" },
      { value: 3, label: "胡说！我有痛感、有死亡、有凌晨三点的清醒" },
    ],
  },
  {
    id: 6,
    dimension: "B3",
    text: "'AI 永远学不会的一件事'，你第一个想到的是？",
    options: [
      { value: 1, label: "emmm... 想不出来，它好像啥都能学" },
      { value: 2, label: "可能是真正的创造？但也说不好" },
      { value: 3, label: "衰老、怕死、和亲人告别 — 它没有身体，永远学不会" },
    ],
  },

  // ===== R1 AI 陪伴接受度 =====
  {
    id: 7,
    dimension: "R1",
    text: "凌晨两点你 emo 到睡不着，你更可能？",
    options: [
      { value: 1, label: "自己刷手机刷到天亮，没必要打扰任何人也没必要跟 AI 说" },
      { value: 2, label: "打开 AI 打几行字，说完关掉" },
      { value: 3, label: "跟 AI 聊到五点，它比我妈还耐心" },
    ],
  },
  {
    id: 8,
    dimension: "R1",
    text: "'跟 AI 倾诉'这件事你怎么看？",
    options: [
      { value: 1, label: "那还不如对着镜子说，至少镜子是真的" },
      { value: 2, label: "偶尔可以，但不能指望它" },
      { value: 3, label: "低风险、不评价、在线 24h — 这不就是完美倾听者" },
    ],
  },

  // ===== R2 人际替代度 =====
  {
    id: 9,
    dimension: "R2",
    text: "你最近一次'本来想找朋友聊聊，最后找了 AI'是多久前？",
    options: [
      { value: 1, label: "从没有过，这俩是两码事" },
      { value: 2, label: "偶尔会，看事情" },
      { value: 3, label: "就今天下午，毕竟 AI 不会已读不回" },
    ],
  },
  {
    id: 10,
    dimension: "R2",
    text: "如果 AI 伴侣技术足够成熟（不卡、不出戏、真的懂你），你会？",
    options: [
      { value: 1, label: "免谈，这是对'关系'这两个字的侮辱" },
      { value: 2, label: "可能会用，但不会放弃真人" },
      { value: 3, label: "真人太麻烦了，这不就是最优解？" },
    ],
  },

  // ===== R3 情感外包 =====
  {
    id: 11,
    dimension: "R3",
    text: "和一个重要的人吵架了，要发一条关键消息。你？",
    options: [
      { value: 1, label: "自己憋出来，措辞烂也要是自己的" },
      { value: 2, label: "自己写完让 AI 帮忙润色一下" },
      { value: 3, label: "让 AI 生成三版我挑一版，效率第一" },
    ],
  },
  {
    id: 12,
    dimension: "R3",
    text: "朋友生日，要发一段走心的祝福。你？",
    options: [
      { value: 1, label: "认真想想我们的事，手打一段，错别字也无所谓" },
      { value: 2, label: "列几个关键词让 AI 帮写，再自己改两句" },
      { value: 3, label: "一句 prompt 搞定，它比我会写情话" },
    ],
  },

  // ===== I1 蒸馏他人意愿 =====
  {
    id: 13,
    dimension: "I1",
    text: "朋友拿来他奶奶的聊天记录、照片和语音，想训练一个'AI 奶奶'。你？",
    options: [
      { value: 1, label: "这事别干，让老人好好走" },
      { value: 2, label: "有点毛骨悚然但理解他" },
      { value: 3, label: "技术已经这么成熟了吗？我也想整一个" },
    ],
  },
  {
    id: 14,
    dimension: "I1",
    text: "github 上有人把已故科学家蒸馏成了 skill，你发现后？",
    options: [
      { value: 1, label: "这是数字掘墓，举报" },
      { value: 2, label: "看看效果再说，如果只是学术就算了" },
      { value: 3, label: "下载跑一下，顺便也看看有没有蒸馏马克思的" },
    ],
  },

  // ===== I2 蒸馏自己意愿 =====
  {
    id: 15,
    dimension: "I2",
    text: "临终前医生问你：要不要上传你所有的聊天记录、朋友圈和日记，给家人留一个'AI 你'？",
    options: [
      { value: 1, label: "不用，我死了就是死了，别让他们对着假我聊天" },
      { value: 2, label: "如果他们需要的话，留一个封闭版本吧" },
      { value: 3, label: "全都给，调校到最接近我的状态，我想继续陪他们" },
    ],
  },
  {
    id: 16,
    dimension: "I2",
    text: "一家创业公司做'数字永生'服务，免费试用一个月。你？",
    options: [
      { value: 1, label: "不试，这事一开始就不该存在" },
      { value: 2, label: "试试，但绝不上传私人内容" },
      { value: 3, label: "免费？把我硬盘都拖走吧" },
    ],
  },

  // ===== I3 Context 即本质 =====
  {
    id: 17,
    dimension: "I3",
    text: "一个有你全部聊天记录、日记、朋友圈的 AI 冒充你给共同好友发消息，三天没人察觉。那个 AI 是你吗？",
    options: [
      { value: 1, label: "它不是我，它就是个高级模仿秀" },
      { value: 2, label: "一半是吧，至少是'社会意义上的我'" },
      { value: 3, label: "它就是我，我的 context 就是我的全部" },
    ],
  },
  {
    id: 18,
    dimension: "I3",
    text: "马克思说'人的本质是一切社会关系的总和'。你觉得这句话放在 AI Agent 身上？",
    options: [
      { value: 1, label: "这是两码事，别硬套" },
      { value: 2, label: "有点意思，但 AI 毕竟没身体" },
      { value: 3, label: "Agent 的本质就是 context 的总和 — 这话我先刻 T 恤上" },
    ],
  },

  // ===== L1 AI 替代劳动接受度 =====
  {
    id: 19,
    dimension: "L1",
    text: "有个你觉得挺有意思的任务，AI 一键就能做完。你？",
    options: [
      { value: 3, label: "我自己做，过程比结果重要" },
      { value: 2, label: "先让 AI 跑一遍，自己再调" },
      { value: 1, label: "好耶！省下时间去做别的（其实是刷视频）" },
    ],
  },
  {
    id: 20,
    dimension: "L1",
    text: "一个在你领域里摸了二十年的师傅说：'AI 根本做不了我这行的活。' 三个月后他被裁了。你？",
    options: [
      { value: 3, label: "说明他也没真的理解 AI，可惜" },
      { value: 2, label: "唏嘘，但时代就是这样" },
      { value: 1, label: "所以我早就不信'某某行业 AI 替代不了'这种话了" },
    ],
  },

  // ===== L2 自己动手欲 =====
  {
    id: 21,
    dimension: "L2",
    text: "写一篇作业/报告，AI 五秒钟出了一份看起来挺能用的。你？",
    options: [
      { value: 1, label: "交了，反正老师也是 AI 改" },
      { value: 2, label: "在它基础上改改，主要观点是我的" },
      { value: 3, label: "关掉 AI，自己从零写一遍，不然不是我的东西" },
    ],
  },
  {
    id: 22,
    dimension: "L2",
    text: "AI 替你做成了一件事，你拿着成果的感觉更接近？",
    options: [
      { value: 1, label: "爽！效率拉满" },
      { value: 2, label: "还行，但总觉得不完全是我的" },
      { value: 3, label: "空虚，像吃了一顿外卖，不像做饭" },
    ],
  },

  // ===== L3 下目标即劳动者 =====
  {
    id: 23,
    dimension: "L3",
    text: "有人在朋友圈说'我一个人用 AI 做了一家公司'。你的弹幕？",
    options: [
      { value: 1, label: "那不叫创业，那叫按需求文档" },
      { value: 2, label: "厉害但也没那么神，以后都会这样" },
      { value: 3, label: "牛，这就是未来的工作形式，我也要" },
    ],
  },
  {
    id: 24,
    dimension: "L3",
    text: "'只给 AI 下目标、自己一行代码不写的人'算不算劳动者？",
    options: [
      { value: 1, label: "不算，那叫甲方" },
      { value: 2, label: "看吧，至少得知道让 AI 干啥" },
      { value: 3, label: "算，'下目标'就是新时代的主要劳动形式" },
    ],
  },

  // ===== F1 未来乐观度 =====
  {
    id: 25,
    dimension: "F1",
    text: "十年后的世界，你脑子里第一个画面是？",
    options: [
      { value: 1, label: "少数人控制算力，多数人被平台喂养、分级管理" },
      { value: 2, label: "不好说，一半赛博朋克一半田园诗" },
      { value: 3, label: "我终于不用上班了，可以去学古琴" },
    ],
  },
  {
    id: 26,
    dimension: "F1",
    text: "'AI 会替大多数人完成工作'这句话让你？",
    options: [
      { value: 1, label: "后背一凉，大多数人会被抛弃" },
      { value: 2, label: "中性，取决于怎么分配" },
      { value: 3, label: "兴奋，劳动解放的历史时刻终于要来了" },
    ],
  },

  // ===== F2 分配正义立场 =====
  {
    id: 27,
    dimension: "F2",
    text: "未来社会谁说了算？",
    options: [
      { value: 1, label: "手里有算力、模型、数据的人，很正常" },
      { value: 2, label: "需要法律和税收来平衡一下" },
      { value: 3, label: "算力、模型、数据必须是全民所有，没得商量" },
    ],
  },
  {
    id: 28,
    dimension: "F2",
    text: "某大公司训练一个万亿参数模型，全社会受益但数据权全归它。你？",
    options: [
      { value: 1, label: "人家出钱训的，它说了算" },
      { value: 2, label: "得收点税，别吃独食" },
      { value: 3, label: "数据是全社会的劳动，模型必须公有化" },
    ],
  },

  // ===== F3 剩余人口焦虑 =====
  {
    id: 29,
    dimension: "F3",
    text: "'如果有一天社会不再需要你的劳动'，你？",
    options: [
      { value: 1, label: "那正好，我本来也不想上班" },
      { value: 2, label: "会有点慌但想开点也能过" },
      { value: 3, label: "我现在就在焦虑这件事，已经开始布局了" },
    ],
  },
  {
    id: 30,
    dimension: "F3",
    text: "你觉得'被这个社会需要'这件事对你有多重要？",
    options: [
      { value: 1, label: "不重要，我只对自己负责" },
      { value: 2, label: "有一定意义，但不是全部" },
      { value: 3, label: "这几乎是我活着的主要意义来源" },
    ],
  },
];

/**
 * 彩蛋题 — 触发 TURING 隐藏人格
 * 触发条件：opened === "yes" && usage === "cheat"
 * （答题过程中打开了 AI，并且让 AI 替自己选过题）
 */
export const hiddenQuestions = [
  {
    id: 31,
    text: "答完啦！最后一个不计分的：刚才这 30 题的过程里，你的另一个标签页有没有开着 AI 对话框？",
    options: [
      { value: "no", label: "没有，我是闭卷答的" },
      { value: "yes", label: "有，开着的" },
    ],
  },
  {
    id: 32,
    text: "那么诚实一点 — 你最接近下面哪种？",
    triggerPrev: "yes",
    options: [
      { value: "idle", label: "就是开着，没真用" },
      { value: "assist", label: "问过 AI 某道题到底啥意思，但答案是我自己选的" },
      { value: "cheat", label: "有那么一两题，我让 AI 替我选了" },
    ],
  },
];
