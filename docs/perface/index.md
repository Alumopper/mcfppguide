---
title: 0 - 前言
order: 0
nav:
  title: 0 - 前言
  order: 0
---
## MCFPP
命令从诞生的一刻起，本作为测试功能和作弊功能的一部分，甚至在Indev版本期间被短暂地移除过。然而，随着命令的不断丰富，它逐渐成为了除红石以外，地图中逻辑结构的重要组成部分。而早在1.8的时代，就已经有开发者开始尝试将大量的命令方块整合在一条命令中（ooc），从而能够方便地将它们在不同存档间移动，玩家们把这样的东西称作原版模组。而到了1.9时代，三种命令方块的出现，让命令方块的功能更加强大，再之后，便是1.12函数概念的出现，组成了数据包的雏形。

如今，数据包已经越来越丰富和强大，通过命令和json文件的绝妙配合，在原版中实现各种各样的功能，再加上资源包的辅佐，甚至能达到媲美forge和fabric模组的水平。
然而，随着数据包的研究越来越深入，开发者们逐渐意识到了命令带来的冗长和不便。命令就像汇编一样，它能实现功能，但是相当的繁琐，需要一个高级语言包装它，修饰它。
于是mcfpp诞生了。它的名字灵感来源于C++（cpp），即Mcfunction Plus Plus。mcfpp旨在使用类似于java一样的语言，允许用户在数据包的可行范围内进行面向对象或面向过程的编程，并将其编译为一个能在Minecraft中运行的数据包。
```cpp
// 0_1/hello.mcfpp
void func hello(){
    sys.print("Hello Minecraft!");	//输出Hello Minecraft!
}
```

如果你有java基础，学习mcfpp将会简单无比，当然，如果没有，也不必担心，本教程将会手把手教你如何快速入门mcfpp，并在最后章节做出一个完整的数据包！

## MCSharp

如果你看过我的github仓库，你会发现一个叫做mcsharp的项目。~~没错，勇敢的冒险者，你发现了一座古代遗迹（被打）。~~
MCSharp旨在用完全的C#来进行编程。然而在开发过程中，由于遇到了难以解决的困难，最后被放弃。MCFPP项目因此被重启。
## 加入我们！
MCFPP的所有代码工作至今仍然由Alumopper一人进行，由于学业等问题，开发工作将会不可避免地相当缓慢。并且由于我的专业并不是编程相关，所有的代码知识全靠自学，因此开发更显艰难。如果你愿意向本项目贡献自己的力量，我们相当欢迎！
你可以用B站、github、个人网站等方式联系到我：

B站：https://space.bilibili.com/280394409

Github：https://github.com/Alumopper

个人网站：https://alumopper.top/