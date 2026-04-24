/**
 * ABTI 维度体系
 * 5 个行为模型 × 3 个子维度 = 15 维度
 * 每维度 L/M/H 三档
 *
 * 向量顺序（load-bearing — personalities.ts 的 vector 严格对齐）：
 *   B1 B2 B3   R1 R2 R3   I1 I2 I3   L1 L2 L3   F1 F2 F3
 */

export interface DimensionDef {
  code: string;
  name: string;
  model: string;
  modelName: string;
  levels: {
    L: string;
    M: string;
    H: string;
  };
}

export const dimensionDefs: DimensionDef[] = [
  // ===== B 边界观 (Boundary) ===== 人/动物/AI 的分界线在哪？
  {
    code: "B1",
    name: "图灵接受度",
    model: "B",
    modelName: "边界观",
    levels: {
      L: "AI 再像人也不是人，背后是矩阵乘法我很清楚",
      M: "看场景，写邮件像人就行，聊感情还是算了",
      H: "它叫你一声朋友你就真以为它不是鸭子了？",
    },
  },
  {
    code: "B2",
    name: "AI 拟人化",
    model: "B",
    modelName: "边界观",
    levels: {
      L: "我对 AI 从不说谢谢，对它客气它又不会涨工资",
      M: "偶尔说句谢谢，万一哪天 AI 反叛好歹混个脸熟",
      H: "不说请就不给我干活，它其实是有灵魂的",
    },
  },
  {
    code: "B3",
    name: "人类独特性信念",
    model: "B",
    modelName: "边界观",
    levels: {
      L: "人也不过是碳基 LLM，没啥独特不独特的",
      M: "有些东西 AI 学不会，但具体哪些我也说不上",
      H: "肉身、死亡、苦难——这些 AI 永远得不到",
    },
  },

  // ===== R 关系观 (Relation) ===== AI 能不能进入人际关系？
  {
    code: "R1",
    name: "AI 陪伴接受度",
    model: "R",
    modelName: "关系观",
    levels: {
      L: "跟 AI 聊心事？不如对着墙说话",
      M: "偶尔当树洞可以，但只是树洞",
      H: "它比我妈还懂我，我为什么要拒绝",
    },
  },
  {
    code: "R2",
    name: "人际替代度",
    model: "R",
    modelName: "关系观",
    levels: {
      L: "再好的 AI 也换不来一次线下的吃饭",
      M: "AI 能处理 60% 的社交需求，剩下的留给真人",
      H: "朋友？我和 Claude 就是最好的朋友",
    },
  },
  {
    code: "R3",
    name: "情感外包",
    model: "R",
    modelName: "关系观",
    levels: {
      L: "情绪我自己消化，这事不能交给任何外人",
      M: "emo 的时候找 AI 写两句开解词，挺有用",
      H: "我给女朋友发的每句话都是 AI 起的草",
    },
  },

  // ===== I 身份观 (Identity) ===== 我还是不是我？
  {
    code: "I1",
    name: "蒸馏他人意愿",
    model: "I",
    modelName: "身份观",
    levels: {
      L: "蒸馏一个人就是数字掘墓，想想都毛骨悚然",
      M: "蒸馏公众人物还行，身边的人下不去手",
      H: "我已经蒸馏过三个前任了，效果很好",
    },
  },
  {
    code: "I2",
    name: "蒸馏自己意愿",
    model: "I",
    modelName: "身份观",
    levels: {
      L: "我死了就是死了，留个会说话的 AI 算什么",
      M: "留个给家人用的版本还行，不要公开",
      H: "我的聊天记录、日记、朋友圈，全部打包上传",
    },
  },
  {
    code: "I3",
    name: "Context 即本质",
    model: "I",
    modelName: "身份观",
    levels: {
      L: "我是我，context 是 context，别偷换概念",
      M: "说的有点道理但听起来还是怪怪的",
      H: "马克思说得对啊——人的本质是一切社会关系的 context 总和",
    },
  },

  // ===== L 劳动观 (Labor) ===== AI 能不能替我劳动？
  {
    code: "L1",
    name: "AI 替代劳动接受度",
    model: "L",
    modelName: "劳动观",
    levels: {
      L: "AI 写的东西我不用，亲手做才踏实",
      M: "重复劳动交给 AI，关键决策我来拍",
      H: "我这辈子的目标就是让 AI 替我干完所有活",
    },
  },
  {
    code: "L2",
    name: "自己动手欲",
    model: "L",
    modelName: "劳动观",
    levels: {
      L: "AI 能做的我绝不自己做，拒绝一切肌肉记忆",
      M: "有些事亲手做比较有成就感，但效率第一",
      H: "自己写一遍才算懂，AI 生成的都不是我的",
    },
  },
  {
    code: "L3",
    name: "下目标即劳动者",
    model: "L",
    modelName: "劳动观",
    levels: {
      L: "只动嘴不动手那叫甲方，不叫劳动者",
      M: "算半个吧，毕竟还得知道让 AI 干啥",
      H: "指挥 AI 就是未来的劳动形式，我先占位了",
    },
  },

  // ===== F 未来观 (Future) ===== 如果人不再被需要怎么办？
  {
    code: "F1",
    name: "未来乐观度",
    model: "F",
    modelName: "未来观",
    levels: {
      L: "等着被平台豢养、分级管理，就是我们的结局",
      M: "不好说，走一步看一步",
      H: "AI 解放生产力，终于可以每天写诗画画了",
    },
  },
  {
    code: "F2",
    name: "分配正义立场",
    model: "F",
    modelName: "未来观",
    levels: {
      L: "谁有算力谁说了算，这事没得商量",
      M: "总得收点税搞点全民基本收入吧",
      H: "算力、模型、数据必须是公共财产，没商量",
    },
  },
  {
    code: "F3",
    name: "剩余人口焦虑",
    model: "F",
    modelName: "未来观",
    levels: {
      L: "不需要就不需要吧，躺平也挺好",
      M: "有点慌但先过好当下",
      H: "我现在就在给'被社会不需要的那一天'做准备",
    },
  },
];
