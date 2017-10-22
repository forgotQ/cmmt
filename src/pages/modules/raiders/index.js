/**
 * Created by ningsong on 17/8/3.
 */
const Raiders = resolve => require(['./raiders'], resolve)
const BannerList = resolve => require(['./bannerList'], resolve)
const Article = resolve => require(['./article'], resolve)
const ArticleDetil = resolve => require(['./articleDetil'], resolve)
const ArticleEdit = resolve => require(['./articleEdit'], resolve)
const ClassList = resolve => require(['./classList'], resolve)
const About = resolve => require(['./about'], resolve)
const Practical = resolve => require(['./practical'], resolve)
const Walk = resolve => require(['./walk'], resolve)
const walkDetil = resolve => require(['./walkDetil'], resolve)
const playDetil = resolve => require(['./playDetil'], resolve)
const walkEdit = resolve => require(['./walkEdit'], resolve)
const playEdit = resolve => require(['./playEdit'], resolve)
const Play = resolve => require(['./play'], resolve)
const Strategy = resolve => require(['./strategy'], resolve)
const strategyDetil = resolve => require(['./strategyDetil'], resolve)
const strategyEdit = resolve => require(['./strategyEdit'], resolve)
const scenics = resolve => require(['./scenics'], resolve)
const scenicsDetil = resolve => require(['./scenicsDetil'], resolve)
const classMangerList = resolve => require(['./classMangerList'], resolve)
const classMList = resolve => require(['./classMList'], resolve)

export default {
  Raiders,
  BannerList,
  Article,
  ArticleDetil,
  ArticleEdit,
  ClassList,
  About,
  Practical,
  Walk,
  walkDetil,
  walkEdit,
  Play,
  playDetil,
  playEdit,
  Strategy,
  strategyDetil,
  strategyEdit,
  scenics,
  scenicsDetil,
  classMangerList,
  classMList
}
