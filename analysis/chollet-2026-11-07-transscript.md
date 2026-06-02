1.1 Intelligence Definition and ARC Benchmark
0:00
Intelligence is very specifically your ability to handle novelty, to deal with situations you've not seen before and come up on the
0:09
fly with models that make sense in the context of that situation. And this is actually something that you see very little of in LMS.
0:18
If you ask them to solve problems that are significantly different
0:23
from anything they've seen in their training data, they will fail the Abstraction and Reasoning Corpus for Artificial General Intelligence,
0:31
or AGI for short. You can think of it as a kind of IQ test that can be taken by humans. It's actually very easy for
0:37
humans or AI agents. Every task that you see, every task you get is novel. It's different from any other
0:45
task in the dataset. It's also different from anything you may find online. ArcGIS is designed to be
0:51
resistant to memorization, and all the other benchmarks can be hacked by memory alone. When I've spoken to AI researchers,
0:58
I've gone through Arc and challenges together with them, and they are trying to look at their introspection.
1:06
So they're saying, I'm looking at this problem and I know it's got something to do with color. I know it's got something to do
1:12
with counting. And and then they run the program in their mind and they say, one, two, three. No, that doesn't work.
1:17
That doesn't work. I think introspection is very effective when it comes to getting some idea of how your
1:24
mind handles system two thinking. I think it's not very effective for system one, because system one is inherently not something
1:32
you have direct access to. It happens like unconsciously, instantly in in parts of your brain that you're not directly observing
1:41
via your own consciousness. But system two is not like that. System two is very deliberate. It's very slow, very low bandwidth,
1:48
it's very introspectable. But what's not mentioned here is.
1:58
Francois Chollet. It's a it's an honor to have you on the show. Honestly, this this means so much to me. You're my hero. So thank you so much.
2:05
It's my pleasure to be here. And I would say you shouldn't have heroes like it's. I shouldn't know. Why not?
2:12
It makes for a disappointing experience. Um, not for me. Okay. Yeah, not. Not for me, but hopefully I can.
2:19
I can live up to to the expectations of. Definitely. I'm sure you will. Um, Francois, I mean, you've been critical of of the idea
2:27
of scale is all you need in AI. Can you tell me about that? Sure. So, yeah. So this idea,
2:35
that scale is all you need is, uh, something that comes from,
2:41
uh, the observation of scaling, scaling laws when training deep neural networks, which is the scaling laws,
2:47
are this relationship between the performance you see in, in, uh,
2:53
deep learning models so typically llms lamps and how much data and compute went into training them. And it's this sort of like a
3:02
logarithmic scaling of LM performance as as a function of training compute.
3:07
Typically that's how it's formulated. And many people are extrapolating
3:13
from that that well, there's there's no limit to how much performance
3:20
we can get out of these models. All we need is to scale up the compute by a few orders of magnitude. Right.
3:26
And eventually we'll get much beyond a human level performance purely via scaling. Compute with no change in
3:35
architecture, with no change in training paradigm. And well, the major flaw here is the way you measure performance.
3:45
In this case, performance is measured via exam style benchmarks, which
3:51
are effectively memorization games. So you're effectively measuring
3:57
how good the LLM is at memorizing the answers to the questions
4:03
that you're going to test it on. Not necessarily the exact answers, but maybe the sort of like, uh, program templates that you need to
4:11
apply to arrive at the answers. And if you're measuring, uh,
4:17
something that's fundamentally driven by memory, then it makes sense that that as you increase the amount of memory in the system,
4:27
like the number of parameters, the amount of training data and compute is really just a proxy for that. You see a higher performance because
4:36
of course, if you can memorize more, you're going to do better at your memory game. Um, and my take is that this
4:44
performance increase that you're observing, it is actually orthogonal to intelligence. You are not really measuring
4:50
intelligence because your benchmark can be hacked purely by preparing for
4:56
it, by memorizing things in advance. If you want to benchmark
5:01
intelligence, you need a different kind of game. A game that you cannot prepare for something like arc, for instance.
5:08
And I think if you look at a performance in Arc over time or
5:14
as a function of compute, you don't see this relationship. In fact, the highest performing models on Arc today did not require
5:24
tons of compute, and some programs such approaches actually did not require any training time compute because they were not trained at all.
5:34
They do require some inference time compute, but it's not a very large amounts. So you've said that language models
1.2 LLMs as Program Memorization Systems
5:42
are interpolative databases. And I've spoken with Saburo the other day and he calls them approximate retrieval systems.
5:51
And many people say to me, Tim, this is ridiculous. That, of course, they're not databases. They do extrapolation.
5:57
But I think as an intuition pump around memorization, that that is what they do. And you wrote a Substack blog
6:04
about this as well? Yes. Memorization is what they do. I think the part where people get stuck is that when when they hear
6:12
memorization, they think the llms are just memorizing answers to questions.
6:17
They are just memorizing content, right? And of course, they do memorize a lot of content, a lot of
6:24
knowledge and factories and so on. But that's not primarily what they do. What they're primarily memorizing
6:30
is functions programs. And these programs do generalize
6:35
to some extent. They're capable of generalization. And when you query LLM you are basically querying a point in
6:46
program space. You can think of the LM as a manifold where each point encodes a program. And of course, you can, you know,
6:56
interpolate across these manifolds to compose programs or combine programs via interpolation like this, which means that you have an
7:04
infinite number of possible programs to choose from. And what happens with LMS is you are training them, training this very,
7:13
uh, very rich, very flexible models to predict the next token. Right.
7:20
And if you had an infinite memory capacity, what you could do is of course, just learn a kind of lookup table. Right.
7:29
But in practice, the LM only has some billions of parameters.
7:34
So it cannot just learn a lookup table for every sequence in its training data. It has to compress. And so what is actually learning
7:43
is predictive functions that The tech and detect the form of
7:48
vector functions. Of course, because DM is a curve. So the only thing you can encode with a curve is a bunch of
7:54
vector functions. And so you're learning these vector functions that take as input elements of of the entry
8:03
sequence and and outputs elements of what comes after that.
8:09
Like for instance, let's say the LM comes across, um, the works of
8:15
Shakespeare for the first time, but the LM has already learned a model of the English language. Well, now the text that it's
8:25
looking at is slightly different, but it's still the English language. So it is possible to model it by reusing a lot of functions that
8:37
came from learning to model English in general. Um, and it becomes much easier to model Shakespeare by just learning
8:47
a sort of style transfer function that will go from the model you have to this Shakespeare sounding text. And that's kind of like how you
8:55
will end up with things like the ability to do textual style transfer with with an LLM. Right. It's because it turns out that it
9:04
is more compressive to learn style independently from content and
9:12
based on on the same kind of model. The LLM is going to learn millions of of independent predictive functions like this.
9:21
And it can, of course combine them via interpolation because they're all vector functions. They're not like a discrete
9:28
programs like you might imagine a Python program, for instance. They are not like that. They're actually vector functions.
1.3 Kaleidoscope Hypothesis and Abstract Building Blocks
9:36
Because when you when you say program, I think a lot of people think of a program as being something with conditional logic and with an
9:42
LLM. That's not what they are there. Yeah, it's almost like in an input sensitive way. You see this kind of traversal
9:49
through the model and it's like a mapping. So it feels more input to output mapping.
9:54
And that mapping is continuous and it is implemented via a curve.
10:00
But but we can describe that as a program. Yes of course there are functions. Yes. And and you said they were compositional. Yes.
10:08
Because these functions are vector functions. You can sum them.
10:14
For instance you can interpolate between them to produce new functions. I love this kaleidoscope hypothesis.
10:22
So can can you, you know, dramatically introduce the kaleidoscope hypothesis. Sure. So everyone knows where the
10:30
kaleidoscope is, right. It's like this cardboard tube with a
10:36
few bits of colored glass in it. And and.
10:42
this is just like a few bits of original information gets mirrored
10:48
and repeated and transformed, and they create this tremendous
10:53
richness of complex patterns. It's beautiful. And the kaleidoscope hypothesis is this idea that the world in general,
11:04
and any domain in particular, follows the same structure that it appears
11:10
on the surface to be extremely rich and complex and infinitely
11:17
novel with every passing moment. But in reality it is made from
11:23
the repetition and composition of just a few atoms of meaning.
11:30
And a big part of intelligence is the process of mining your experience
11:37
of the world to identify bits that are repeated and to extract them.
11:43
Extract these unique atoms of meaning and when we extract them,
11:48
we call them abstractions. And then as we build a sort of like
11:54
inner banks of such abstractions, then we can reuse them to make
12:01
sense of novel situations, of situations that appear to be extremely unique and novel on the surface, but actually they can be
12:07
interpreted by composing together these reusable abstractions.
12:14
That's the fundamental idea behind intelligence. Intelligence is a cognitive mechanism that you use to adapt to novelty,
12:24
to make sense of situations you've never seen before. And it works by creating models on the fly of the new situation,
12:35
by combining together existing building blocks. Abstract building blocks which were mined from your past experience.
12:43
And there are two key tricks here. One trick is the synthesis trick,
12:49
whereby you take these building blocks and quickly assemble them to
12:55
form a program model that matches the current task or the current situation that you're facing in synthesis. And there's abstraction generation,
13:05
which is the reverse process in which you're looking at the information
13:10
you've you've got available about the world, like your your experience, your perception, also the models that you've created to respond to it.
13:19
And you're going to turn that, distill it into reusable abstractions, which you then store in your memory so that you
13:27
can use it the next time around. So synthesis and abstraction generation, and together they form intelligence in my model,
13:35
at least in my architecture of AGI. So you've been prominent in the
1.4 Deep Learning Limitations and System 2 Reasoning
13:41
in the AI space for many, many years now. What experiences or insights led you to develop such a clear
13:47
perspective of intelligence so early in your career? Right. So if you read some of my old blog posts or the first edition of my deep
13:59
learning book, you see that I started talking about how deep learning
14:05
could do system one very well, but could not do system two.
14:10
And I started talking about the need for program synthesis, um,
14:16
roughly in mid 20, 2016. I mean, I started writing writing about it a lot in 2017, but in practice, I started forming
14:25
these ideas in 2016, and there are several things that led me to it.
14:31
I think one of the big catalyst events was working on automated
14:37
theorem proving using deep learning with Christian Szegedy.
14:43
Um, and the the key idea was, you know, theorem proving is very,
14:48
very akin to program synthesis. Um, you're basically doing a tree search with operators taken from a DSL.
14:58
And the key idea was to use a deep learning model to guide the
15:04
search process. And so I tried to do it for a pretty long time, you know, trying and trying lots of
15:11
different ideas and everything I was trying basically failed. I mean, it was doing much better than random.
15:17
But if you analyzed how it was performing and how it was, uh,
15:23
producing that, that ability to perform better than random, it was just doing shallow pattern recognition. Right?
15:30
It was not really doing any kind of system two reasoning, and it seemed
15:36
like a like a huge obstacle that I was just not able to overcome by
15:41
tweaking the architecture or the training data or anything else. Um, there was this pattern recognition shortcut available,
15:48
and this shortcut would be taken every single time. You could not learn generalizable, uh,
15:55
discrete programs via deep learning. And that came as a,
16:00
as a big insight to me, because before that point, I was, you know, like everybody else in the field, I was under the assumption that deep
16:09
learning models were a very general computing substrate, that you could train deep learning models to perform any kind of computation that they
16:18
were they were Turing complete and that they were Turing complete. And, um, around the same time, you know, 20, 2015, 2016,
16:27
there were lots of similar ideas floating around, like the concept of neural Turing machine. For instance,
16:33
people thought and I thought this was a very promising direction that deep learning could ultimately replace handwritten software.
16:43
You know, so I subscribed to to these ideas very early on.
16:48
But then in these experiments, trying to get neural networks to do math,
16:53
I realized that actually they were fundamentally limited, that they were a pattern recognition engine, and that if you wanted to do system
17:02
two thinking you needed something else, you needed program synthesis. So that's when I had this, this realization,
17:09
I started talking about it. Um, but in general, you know, I've been thinking about intelligence and how to create
17:17
it for quite a long time. Like my first sort of like, uh, AGI
17:23
architecture, something I developed in back in 2010. Summer 2010. So.
17:31
And the reason I developed it is because I was already thinking about it for, for a few years before. So I've been I've been in the field
17:40
for, for quite a while. Yeah. Quick meditation on the shortcut rule, because I think this gets to the core of it, that deep learning.
17:48
I mean, basically we're projecting it into a Euclidean space, and the only semantic metric is the Euclidean distance.
17:55
And you know, so so these models learn a spectrum of spurious
18:00
correlations and perhaps more spurious than not spurious. Sure.
18:07
So in general, the reason they're doing this is because spurious, spurious correlations are always available to explain something.
18:16
No matter what you're looking at, there's always some element of noise which you can wrongly interpret as being meaningful.
18:22
And it's also because deep learning models, they are their curves,
18:27
meaning that they are continuous differentiable surfaces in a
18:33
higher dimensional space, and we are fitting the parameters of these curves via stochastic gradient descent. And a curve is.
18:42
You can represent many things with a curve, but it's a very bad substrate to represent any sort of discrete computation. You can do it.
18:49
You can embed discrete processing on a curve, but it's just not a very good idea, right? It's not easy to fit generalizable,
19:01
discrete programs in this format. And this is why you end up with things like the fact that it's tremendously difficult to get a
19:09
deep neural network, to learn how to sort a list, or to learn how to add two sequences of digits, for instance,
19:18
even llms state of the art. They have a very hard time doing it, like they've been trained on millions of examples of adding digits,
19:26
but still they are only achieving something like 70% accuracy on new digits. So they've memorized a program
19:33
to do it. But because this program is a vector function is embedded on a curve, it is not a very good program.
19:41
It is not very accurate. And you see this time and time again with any sort of, uh, algorithmic type processing.
19:50
And just for those of you at home. A piecewise linear function is still a curve. Other people might get confused by
19:57
that because they think of a curve as being this, this smooth thing. But, um, if you look at the Wikipedia definition of curve,
20:03
you're absolutely right. It's still it's still a curve. You mentioned the neural Turing machine, which actually isn't a
20:09
Turing machine, of course, but it behaves a little bit like one. What do you see is the gap there? You know, with neural networks
20:16
not being Turing machines? Fundamentally, I think, uh, fitting
20:21
a parametric curve with gradient descent is a good fit for what I
20:27
call value centric abstraction, which is the idea that you're going to compare things via a continuous distance function,
20:34
which leads to the idea that you're going to embed things. And by things I mean like instances of something like could be images,
20:41
could be discrete concepts, could be words. Right. That's that's going to lead to this idea that you're going to
20:48
embed them in a on a manifold. So a space where two things that
20:54
are similar end up close together and different dimensions of variation on your manifold are semantically meaningful.
21:02
You can do this with curves, with curves, because, um,
21:08
the sort of like continuous, it naturally leads you to compare
21:13
things via via continuous distance. But that's a very bad fit for any
21:18
kind of, uh, type two abstraction, like what they call program centric abstraction, where you're actually interested in graphs and
21:27
you're not interested in comparing graphs via a distance function. You're interested in comparing when two graphs are exactly identical
21:37
to each other, or more precisely, when a graph appears to be a subcomponent of a larger graph. So, for instance,
21:45
as a software engineer, if I'm refactoring some code, if I want to compress my code by expressing multiple functions as just
21:55
one function, I am not interested in how close the functions feel.
22:01
On a perceptual level. I'm interested in whether they are implementing the exact program or in in maybe in different forms.
22:12
Maybe I need to inject some abstraction in there. And this is a comparison that you have to do in a very
22:21
explicit step by step way. You cannot just look at two pieces of code and instantly say, without having to think about it.
22:28
Oh yeah, they look similar, you know. And how would you describe that capability? It's like a kind of epistemic risk
22:34
rather than an aleatoric risk or verification might be a better way of describing it. Yeah. I think it's step by step
22:41
verification is a good way of describing it. And, you know, I just said it's definitely not like this sort of
22:49
like perceptual continuous distance style comparison. And that's true.
22:55
But I think it can also be guided by perception. It's like doing this step by step exact comparison is very costly.
23:04
It it requires, you know, all of your attention expanded over some length of time. So you are not going to want to do
23:12
it, uh, kind of in a brute force like way over many different
23:18
possible candidate functions. You want to use your intuition to identify just a small number of options.
23:26
And these options you're going to try to verify. Exactly. So I do think we have the ability to do approximate, uh.
23:38
Distance comparisons between, uh, discrete objects. But the key thing to keep in mind is that, uh, these these
23:47
fast comparisons are not exact, right? They are approximate.
23:53
So they might be wrong. And I think you get, um, the same
23:58
type of outputs from an LLM if you're trying to use it for programming.
24:05
And they, they will often give you things that feel right but
24:11
aren't exactly right. And in general, I think that's the thing to keep in mind when using deep learning,
24:17
or when you're using llms, is that they are very good at giving you things that are directionally accurate, but not actually accurate.
24:25
So if you want to use them well, you need this, uh, post facto verification step. So, um,
24:34
watching your children grow up. How has it influenced your thinking on intelligence and learning? One thing you notice when you watch
24:43
children grow up is the fact that constructivism is entirely right,
24:52
that you they learn things in a very active manner. They try things out.
25:01
And from these experiences it's very deliberate expenses. They extract new skills, which then they, they reinvest in, in new goals.
25:11
And in general, you know, you see pretty clearly that learning,
25:17
learning in general, but especially in children, is structured in what I would describe as a series of feedback loops where the child
25:25
will notice something interesting, come up with an idea, set that
25:30
as a goal, like, imagine you're you're there on the floor crawling. Then you notice something that looks intriguing.
25:37
So you're like, hey, I'm gonna grab it, right? So that's your goal. And now you're entering this sort of feedback loop where you're
25:44
trying to reach that goal, you're doing something towards it. Then you get some feedback and you're evaluating. Right.
25:52
You have this sort of like plan action feedback, back to plan loop.
25:58
And if you reach the goal, then in the process you will have
26:04
learned something and you will be able to reinvest that that new skill in your next endeavor. Um, and the way, the way they set
26:16
goals is always grounded in the things they already know about.
26:22
And you start not knowing, much like when you're born, you're animated by just a few reflexes. Um, but when when you start forming
26:33
these goals, they always come from, from this layer that you've already
26:40
mastered and you're building your own mind, kind of like layer by layer, like at first, for instance, um, one of your most important sensorimotor
26:49
affordances is your mouth, because you have the sucking reflex, which is extremely important. It's something that you're born with.
26:56
It's not something that's acquired. It's extremely important because it's how you feed. Right. Um, and you also have the things
27:02
like the palmar grasp reflex for grabbing things, but you cannot really use it yet because you are not in full control of your limbs,
27:11
so you cannot really like, grasp, grasp things. Um, but, um, when you start being more in control of your limbs,
27:19
you will want to grasp things. And the reason, the first thing that you that you try to do after you grasp a thing is you bring
27:27
it to your mouth to suck it, because you set this goal, um,
27:32
because it sounded interesting with respect to the things you
27:37
already know how to do, with the things you already find to be interesting, right? And once you know how to grab things,
27:43
you're going to add that to your to your, to your world. So you're sort of like inner world. And you're going to build the next
27:49
layer on top of those things, the next thing you're learning to crawl. For instance, why do you crawl? Why why are you trying to move
27:58
forward? Because you saw an object that seemed interesting that you want to grab. So you are learning to crawl,
28:06
to grab something you are learning to grab to put it in your mouth and you're not learning. To put things in your mouth
28:12
because it's already something that's hard coded. So you're sort of like constructing yourself in this sort of like.
28:18
Layer wise fashion. So basically everything. Everything you know. Everything you think about is built
28:26
upon a lower level, lower level primitives which are built upon
28:32
lower level primitives and so on. And ultimately, it comes back to these extremely basic sensorimotor affordances
28:39
that newborn children have. I do believe we construct,
28:44
especially in young children, they construct their thoughts based on their sensorimotor experiences in the world.
28:55
You you have to you cannot think in a vacuum. You have to construct thought to construct thoughts out of something.
29:01
And and that something is extracted from your experience, right?
29:07
And the younger you are, of course, the more grounded your thoughts are.
29:13
They they they relate more directly to the things you're experiencing and doing in the world. As you get older, your thoughts
29:22
will get increasingly abstract, increasingly disconnected from physicality. But they are ultimately, you know,
29:29
built upon the physical layer. It's just that the the tower of
29:34
layers has gotten so tall that you cannot see the ground anymore, but it's still connected. So children see the kaleidoscope,
1.5 Intelligence vs. Skill in LLMs and Model Building
29:42
and the kaleidoscope is created from abstractions in the universe. And then children, over time, derive abstractions from the
29:51
kaleidoscope and reason over them. Yeah, they they notice.
29:58
Bits in their experience or their own actions that appear to be reusable
30:05
and that appear to be useful to make sense of novel situations.
30:11
And as you go, you're building up these vast libraries of reusable
30:16
bits, and having access to them makes you really effective in making sense of new situations. And you said constructivist,
30:26
which is quite interesting. So do you think children construct different abstractions, or do you think there's a kind of attractor
30:33
towards representing the abstractions which the universe came up with? You mean do different people come up with different models?
30:42
To some extent, probably, yes. But because these models are
30:48
ultimately extracted from the same kind of experiences and they're extracted via the same kind of process, they will end up being
30:55
very similar, I would think. I mean, you do you do definitely see that different children follow slightly different developmental
31:05
trajectories, but ultimately they are all somewhat parallel. They are all roughly following the same stages, maybe with
31:13
different timing, you know. So another interesting thing you've said is, you know, language models have near zero intelligence.
31:22
And I just wondered if it's near zero. Which part of it is not zero.
31:27
Sure. Yeah. And you know, people people think that it's a very provocative statement because
31:33
they're using Llms all the time. They find them very useful. They seem to make sense. They seem very human like.
31:39
And so I'm like, hey, they have near zero intelligence. And that sounds kind of shocking, but the key is to understand that,
31:46
um, intelligence is a separate concept from skill,
31:52
from behavior that you can always be skilled at something without necessarily being intelligent. And intelligence is very specifically
32:01
your ability to handle novelty, to deal with situations you've not seen before and come up on the fly with models that make sense
32:11
in the context of that situation. And this is actually something that you see very little of in LMS. If you ask them to solve problems
32:21
that are significantly different from anything they've seen in their training data, they will fail. So that said, if you define
32:29
intelligence in this way and you come up with a way to benchmark it, like ArcGIS, for instance, and you try an LMS like all the
32:37
state of the art LMS on it, they don't have zero performance, right?
32:42
And so this is where the non-zero part of my statement comes from.
32:47
So that said you it's not entirely clear whether that
32:53
non-zero performance, that ability to adapt to novel problems Is actual intelligence or whether it's a flaw of the benchmark.
33:02
Maybe the benchmark was not actually producing entirely novel problems.
33:07
Maybe there was very significant overlap between this or that question, and something that the LLM has seen its training data.
33:14
It's very difficult to control for that because the LLM has just memorized so much. It has seen, you know,
33:20
pretty much the entire internet, plus tons of, uh, data annotations
33:27
that were created specifically for, for, for that LLM, um, and we don't know fundamentally what's in the training data.
33:35
So it's kind of it's kind of difficult to tell, but it does seem to me that aliens are actually capable of some degree
33:43
of recombination, of what they know to adapt to something that they've genuinely not quite seen before. It's just that the degree of
33:55
this recombination, Their generalization power is very weak. It's very low. Yeah. This gets to the core of it
34:02
because a lot of people argue that this combinatorial creativity or this kind of extrapolation does constitute novel model building.
34:10
And I interpreted what you said, as, you know, if we zoom out and think of the training process as well, that that
34:16
obviously is model building. Yes. Obviously it's just, uh, gradient descent, like fitting a curve to a data set
34:23
and descent is model building. The major flaw there is that it's very inefficient. Model building it requires to
34:32
get a good model, you need a dense sampling of pretty much everything the model is going to have to deal with at test time,
34:41
so the model is effectively only displaying weak generalization. It can adapt to things it has not seen before,
34:49
but only if they remain very, very close to things it has actually seen before And where intelligence comes into play is the ability to
34:59
adapt to things that are way out of the of the distribution, because the real world is not a distribution, right? Every day is new.
35:08
Every day is different. But you have to deal with it anyway. Critics will say, and I can, I can empathize.
35:15
I mean, I use Claude Sonnet all the time for my coding. I'm paying for about, I don't know, 2000 requests a month on on cursor.
35:24
So I'm using it a lot and it appears clairvoyant in many cases. And they would argue, I'm sure that well, because it's
35:32
trained on so much stuff, the convex hull is, you know, enough to capture any novelty we might need. Therefore, what's the problem? Sure.
35:41
That's something I hear a lot. I decided that, yeah, maybe novelty is overrated. I just need to train on everything.
35:47
This idea that, yes, there can exist a dense sampling of everything you
35:52
might ever even want to do everything you might ever want to know. So, I mean, I disagree with that because imagine you were you are
35:59
training at LMS ten years ago and you're trying to use them now. They're not going to know about the programming languages that
36:06
you're using. They're not going to know about all the all the libraries and so on. They're certainly going to seem
36:12
much less intelligent. Just because there's this gap in
36:17
your knowledge. The world is changing all the time. And you could say, well, but what if you just retrain the model on freshly
36:25
scraped data every single day? I mean, sure, you can do that and it
36:31
will address some of these problems, but still, it's likely that at some point you will come up with problems that are actually novel,
36:39
problems that don't have a solution on the internet. And that's where you need intelligence. Right?
36:45
And I'm actually quite confident that at some point in the future, maybe in the near future will be able to create a system that can actually
36:56
address this issue of novelty, that can actually take what it knows and recombine it in, in truly original ways to
37:04
address completely new problems. Once we have a system like this, we can start developing new science. For instance, like one of the things
37:14
you cannot do with Llms today is develop a new science, right? Because the best they can do is speak, speak back to you some
37:24
interpolation of something they've read online, right? Um, they're not they're not going to, uh, set you on the way to some
37:34
grand discovery. Again, the devil's advocate on that. I agree that the creativity and the reasoning comes from the prompter.
2.1 Intelligence Definition and LLM Limitations
37:41
And because we anthropomorphize the models and we we discredit the role of the human, but still inside that Addressable space in
37:50
the LM with a human supervisor. I'm sure we can creatively explore
37:55
the convex hull of what is known. Perhaps not create new things. Sure, you can do that. And that's a process.
38:02
You know, as you say, it would be driven by you, the human, because you are going to be the judge of what's
38:08
interesting versus what's nonsense. And without this sort of external verification, it's it's difficult to make good
38:15
use of algorithms in general. You know, that's that's I think that should be the thing you always keep in mind when using
38:21
Llms is that they are very good at making useful suggestions, but you should never blindly trust the suggestions they make, especially
38:31
if it's something like code, right? You should always use it as a
38:36
starting point, but verify. Like make sure that it's actually correct and MPs are very good at putting you in the right direction,
38:45
but they're not very good at That's outputting exactly correct answers. And perhaps that's why if we look at all of the successful implementations
38:54
of LMS or applications, they always have a human supervisor in the loop. Yes. Or it could also be an external
39:01
verifier, like sometimes the verification process is something that you can delegate to a symbolic system.
39:08
So now is a great segue for intelligence. Now fans of the show will know Yannick and I have already made
39:14
about eight hours of content on your measure of intelligence paper. Back in the day, we we pored through it and it's fascinating, but could
39:20
you just briefly introduce it now just to give a refresher? Sure. So my definition of intelligence is skill acquisition efficiency.
39:29
So it's this idea that intelligence is separate from skill. So if you have a benchmark that just measures the skill of an AI
39:37
at something, it is not a benchmark of intelligence. It is always possible to score high without actually displaying
39:44
any intelligence Whatsoever. If you want to actually measure intelligence, you have to look at how efficiently
39:51
the system acquires new skills. Given a limited amount of data.
39:56
So you have to control in particular for the data that the system has access to and which usually takes two forms.
40:04
You know, it can take the form of priors, like the information that the system only has access to before it's looking at your benchmark and
40:12
then experience, which is the amount of information that the system will extract from the task, the benchmark that you're giving to it.
40:20
And so if you control for priors, you control for experience, and you measure skill, then you have some measure of
40:27
skill acquisition efficiency. The information efficiency of the acquisition of high performance on a novel task.
40:36
And that's something that I've tried to turn into a concrete benchmark.
40:41
And that was the AGI data set. Just a quick point on that is one of the potential issues with the measure of intelligence is
40:49
that it's non-computable, because we can't represent the domain of all possible tasks. Sure. So my in the paper,
40:58
I had this formalization of my measure of intelligence,
41:04
and it is non-computable. And its purpose is not to be
41:10
used as a practical tool. Like you're not going to actually want to run this equation on on a system and get a number out of it.
41:20
It is a formalism that's useful to think about the problem of
41:26
intelligence. Precisely. Right. It's a it's a cognitive device. It's not a practical device for of course, there was this wonderful
2.2 Meta-Learning System Architecture
41:34
figure which will show up on the screen now, which is you describe the intelligence system as being a thing which produces skill
41:40
programs while adapting to novelty. But one thing I was wondering, though, is you're talking about it as a kind of meta learning prior.
41:49
And do humans come with the meta learning prior baked in, or is that something we also learn, and should it be the same for AI systems? Yeah.
41:58
So that's that's a very important question. Um, so intelligence is uh, it's not skill. It's a kind of meta skill.
42:07
It is the skill through which you acquire new skills. And is this meta skill also something that is acquired through experience,
42:15
or is it something that you're born with that's that's that comes hard coded in your brain. So by evolution, presumably, um, I
42:25
think the answer is that it is both. I think you are born intelligence. So you are born with, uh, this skill acquisition mechanism.
42:34
But this skill acquisition mechanism does not operate in a vacuum. It actually needs, Uh, so it's it's composed of two bits, right?
42:44
There's the synthesis engine, which, um, takes a look at a new situation,
42:50
a new task, and we'll try to combine existing parts, existing abstractions into a model for that task, for that domain.
43:00
Um, and there's the, the abstraction engine bit, which looks at the models that we have produced so far, looks basically at
43:08
the information you have available, and will try to produce reusable abstractions to be to be added back to the library that's going
43:16
to be used by the synthesis engine the next time around. And um, the this library of course, is acquired through experience.
43:25
And the better your library of abstraction becomes, the more effective you are at synthesis, the more effective you are at
43:33
acquiring new skills efficiently. So I believe that this sort of
43:39
like macro level architecture of intelligence is something that you are born with, but as you use it throughout your lifetime,
43:46
you are getting better at it. You are polishing it. So you're not acquiring intelligence as a skill from scratch,
43:54
but you are polishing it. Another mechanism through which I think you are polishing it is that, um,
44:01
the synthesis mechanism is probably incorporating learned components.
44:07
So that synthesis is itself a synthesis from existing abstractions is itself a skill, and you are getting better at it as you use it.
44:16
So I think, for instance, a 15 year old is going to get better.
44:21
It's going to be better at skill acquisition than a ten year old.
44:27
This is really interesting because in a way, you're combining rationalism, nativism with empiricism, because I think you're saying that
44:33
there is the creation of de novo skill programs that are not just compositions of the fundamental ones, but the broader question as well
44:41
is we do this library learning. So children develop, they they finesse, they refine, they build these abstractions.
44:49
And surely there must be some trade off with complexification because you don't want the library to be too big. No. Right.
44:57
Because then you can do search with it anymore. So is there some kind of pruning or does it converge on a certain size?
45:03
Is that the reason why our cognitive development seems to kind of plateau at a certain point? Um, that's quite possible.
45:13
Um, you know, that's that's actually a very, very deep question. It's also very practical, I think, to building an AGI.
45:21
So your AGI is going to have this library of reusable primitives. Do you want to expand the size of this library indefinitely, or do you
45:29
want to cap it at some number like you want at most 1 million programs
45:34
in it or something like that. So clearly, our ability to efficiently acquire new skills or intelligence does not improve over
45:45
our lifetime in an unbounded fashion. It seems to peak relatively early on.
45:51
I think there's actually a trade off here, which is that your raw
45:56
brain power, like, for instance, the the amount of information that you can integrate in your mind at any given point and kind of kind of
46:06
trends down as you age, inevitably. But the quality of the abstractions
46:14
that you work with and also your intuition for how to combine them.
46:19
So the learning components of the synthesis engine, they do get polished over time. They do get better over time.
46:27
So you have this kind of factor that makes you smarter and this factor that makes you dumber. Um, I, you know, empirically,
46:34
I think intelligence probably peaks in your early 20s. That's when that's when your the most, the most efficient in
46:41
acquiring new skills. But then again, you know, it depends. I think, uh, higher level, uh, cognition peaks probably in your
46:52
early 20s. But there are things that you should be learning earlier than that, right. Anything.
46:59
So, you know, I mentioned like cognition builds layer by layer. Each layer is built on top of the previous one.
47:06
Uh, the lower layers in the stack, they crystallize. They're set in stone relatively, uh, early before 15 typically.
47:17
So if you want to acquire any kind of skill that deals with low
47:22
level sensorimotor primitives, like you want to get really good at playing an instrument, you want to get really good at singing.
47:28
You want to acquire a native accent. In some language. You should do it before you're 15. Typically, yes.
47:35
I mean, on the the abstractions, you could argue that it's it's kind of limited by a computational bound. Or you could argue that it's
47:43
just converging towards universal abstractions. But I wanted to comment on what you just said.
47:49
Personally, I think knowledge is very important. So I've spent years doing this thing with Keith Dugger, who's one of the
47:54
smartest people I know in the world, did his PhD at MIT, and he's taught me how to be smart just the way he thinks about things he has.
48:03
I've reprogrammed my brain, and I'd much rather be like this than go back to my early 20s with better abstractions,
48:11
much better abstractions. But then again, I can give counterexamples. I've spoken with, um, uh,
48:17
I don't want to mention any names, but but sometimes professors who lean too much on their knowledge and not their fluid intelligence,
48:24
they can seem quite entrenched. And so too much knowledge and not enough fluid intelligence can be a bad thing as well.
48:30
There seems to be some kind of optimal balance. Yeah. So it depends whether you're relying on.
48:41
It depends on whether you believe you already have the answers to the questions, or whether you believe you have templates that
48:48
you can use to get the answers. Um, gaining better templates for
48:53
problem solving or even for for generic learning, uh, that that makes you more intelligent. That's one of the points of
49:02
education. Like if you learn math, you learn physics, you learn programming. Now you have all these these meta
49:08
level templates for problem solving that make you more effective at problem solving, that even make you more effective at learning.
49:15
I think at 20 I was a much more effective both in the in the in
49:20
the methods I was using, um, in my approach at language learning than I would have been at at 12 even though at 12 I had, you know,
49:29
more more brain plasticity and more, more memory, it was easier to retain things. But I did not have the right,
49:37
uh, tool sets. Pretty much. And that tool set is very much required. Um, if you think you already have all
49:43
the answers, then you're not going to be looking to create anything new or looking for new information. And maybe that's the pitfall
49:52
that some intellectuals can kind of fall into. And they think they've got everything figured out, so they
49:59
don't need to to search any further. But instead, if you're just carefully
50:04
collecting and curating, um, ways to solve problems or interesting
50:10
ideas and you're not not quite sure how you're going to use them yet, but they sound useful. They sound intriguing.
50:17
Um, and then you're faced with something new. You're going to look into your library, look for, for the best,
50:23
sort of like, uh, thing to connect it to. That's how you get insights.
50:28
Like if you're if you keep all these things in mind and then you come across something new instead of ignoring it because you already
50:36
know everything or you think you know everything, you're going to try to connect it with this sort of like things in your mind that are
50:43
waiting for the click, you know? And that's how you get a big
50:48
eureka moments, you know? Yes, the templates become activated. But I can give an example actually with your measure of
50:54
intelligence paper, I spent weeks studying that paper. I read it so carefully and so deeply, and I remember there were a lot of
51:02
ideas in it that I struggled with, and now I could read it. I could just flick through it, and I just got it.
51:07
And actually, it's the same with many other papers, because you learn these abstractions on mlst. We've always focused on the
51:14
abstractions, but maybe there's a cost to that, because I'm just a cognitive pathway in my brain is just lighting up
51:20
and then and I understand it. But maybe there's something else I'm missing. Sure. I think, you know, by sort of like,
51:28
abstracting away the details, you're able to focus on a bigger picture. The third or the fourth time that you're reading it,
51:36
and then you kind of find something new at a higher level. Yeah.
51:41
You don't get stuck in the details. So at the end of the Measure of Intelligence paper, it was from 1909, right.
51:48
You introduced the Arc challenge, the abstraction and reasoning corpus.
51:53
Can you can you bring that in? Sure. So yeah, it's from from 2019,
51:59
the abstraction and reasoning corpus. It's a data set, a benchmark that tries to capture the measure of intelligence that
52:08
I outlined in the paper. So, um, it's basically an IQ test for machines, but it's also intended to be easy for humans.
52:17
It's a set of tasks that are reasoning tasks. So each task you get a couple, typically 2 to 4 demonstration
52:28
examples, which are the combination of an input image and an output image. And the input image is basically
52:37
a grid of colors. They are pretty small grids, typically like from five, five by 5 to 30 by 30 or 30 by
52:45
30 is the largest. And so you're seeing some patterns in this input grid. And then you're told that it
52:52
maps to a certain output grid with some other pattern. And so your job is to figure out what is the transformation,
53:01
what is the program that goes from input to output. And you get a few pairs input output pairs like this to learn
53:08
this program on the fly. And then you are given a brand new input grid, and you must show that you've understood the
53:15
program by producing yourself the corresponding output grid. and it's pretty easy for humans. For instance, the the.
53:25
So the data set is split into different subsets. There. There's a public training subset which is generally easier.
53:34
It's intended to demonstrate the sort of core knowledge priors that the tasks are built upon. So core knowledge is another
53:42
important concept here. Um, I mentioned the grids feature
53:48
patents where these patents must be referring to something, you know, and um, in order to build anything you need building blocks.
53:58
So these building blocks are core knowledge, which are, uh, sort of like these knowledge priors that all humans are expected to
54:08
have mastered by age, roughly four. So there are going to be things like objectness, like what is an object? Basic geometry, like, you know,
54:16
symmetries, rotations and so on. But basic topology, like things being connected, um, uh, agent ness as well,
54:25
like golden goal directedness. So just this very simple core knowledge systems and everything in the AGI tasks is built upon
54:36
these atoms of knowledge, right? Um, and so the training subset
54:43
is just intended to demonstrate what core knowledge looks like in case you want to apply a machine learning approach.
54:49
And instead of hard coding core knowledge, you want to learn it from from the data. Then there's a public validation
54:57
subset, which is intended to be as difficult as the private, uh,
55:04
private test set. So it's intended for you to test your solutions and see what score you get. And then there's the the private
55:12
test set, which is what we actually evaluate. Uh, the competition on, uh, on Kaggle.
55:20
And, uh, it's pretty easy for humans because we had the private test set verified by two people. Uh, and each one scored 97 to 98%.
55:33
So there are only 100 tasks in the private test set. So it means they actually solved with no prior exposure.
55:41
97 to 98 tasks out of 100. And together they get to 100, right?
55:47
So the task that each did not solve actually at the at the no no overlap.
55:53
So that shows that if you're a smart human, you should be able
55:58
to do pretty much every, every, every task in the data set. And it turns out this data sets is tremendously difficult for AI
56:09
systems. Um, and so I released this in 2019. Today. The state of the art was actually
56:17
achieved earlier this morning. It's 46%, right? Yes. Nice one.
2.3 Program Search and Occam's Razor
56:23
Jack and team. Yes. Muhammad, Jack and Michael. Congratulations, guys. Yeah. Congrats. So and so.
56:32
Oh, by the way, there's actually an approach that's not public,
56:37
but that has a proof of existence which should do 49%.
56:43
At least 49% is what you get if you merely ensemble every entry
56:50
that was made in the 2020 iteration of the competition. Wow.
56:55
Why has nobody done that then? Um, well, it's not exactly apples to apples, right? Because we are talking about
57:03
hundreds of submissions. Each submission was using some slightly different tweak on brute force program search,
57:11
but you have hundreds of them, and each one was consuming some number of hours of compute. So even if you had all the notebooks
57:20
for all these submissions and you put them into one mega notebook,
57:27
it would actually take too long to run it in the competition. Right. So in a way, you are by assembling the submissions, you are in a way,
57:35
um, scaling up brute force program search to more compute and
57:42
you're getting better results. You know, in the limit, if you had infinite compute, you should be able to solve arc purely via
57:51
brute force problem search. Right. Um, it is definitely possible to
57:57
produce domain specific languages that describe arc transformations
58:03
in a relatively concise manner, in a manner so concise that you would never need more than like 40 different transformations to
58:11
express a solution program. And and you're going to have like 200 primitives in your DSL. Well, just finding every possible
58:25
program that's 40 operations deep out of a DSL of 200.
58:30
If you had infinite compute, you could definitely do that, right? Well, there's an interesting discussion point on that.
58:37
I think I raised this with Ryan and Jack, which is that even if you did have an infinite amount of computation, it's there's still
58:44
a selection problem because you could select based on complexity. For example, selection is comparatively easy
58:51
because you can simply so for, for let's say you have infinite compute. So for each program you get. Well technically you get an
58:59
infinite number of matches, right. But let's say realistically you get like ten. You can simply pick the simplest
59:06
one like the shortest one. But is the simplest one a good
59:11
heuristic? Uh, empirically, yeah, it seems to be Occam's Razor. It seems to work in practice, because
59:19
the other potential weakness is, I mean, you mentioned Elizabeth Spelke and the folks at home. You should read she's from Harvard.
59:25
She's a professor of psychology. And, you know, she came up with those those core knowledge priors. But I think you're coming at this
59:31
very much from the psychology school of thought, which is that we should understand the psychology of the human mind and build AI around that.
59:40
Is that fair? Yeah. So I'm a little bit cautious
2.4 Developer-Aware Generalization
59:45
about the idea that I should try to emulate human cognition. I think we don't really understand enough about the human mind for
59:56
that understanding to be a useful guide when it comes to creating AI. So I have my own ideas about how how to how intelligence might
1:00:05
work and how to create some software version of it,
1:00:10
but it's only partially derived from, you know, introspection and
1:00:16
looking at people. Interesting. And the reason I said it might be a potential weakness is let's say we select the lowest complexity program.
1:00:23
We have an infinite amount of computation. We do the program synthesis. And then we assume that because all
1:00:29
of the generalization space would be in the kind of compositional closure of the priors that we start with, then it will work.
1:00:38
But but that is an assumption. Sure, but it's a reasonable assumption. You could also train a system to
1:00:46
judge whether a given program is likely to generalize or not. It will use length on the DSL as one of its features,
1:00:56
but not the only feature. One of the other really important things about the Ark challenge is task diversity, and the
1:01:02
reason we need task diversity. I think if I understand correctly, there are about 900 tasks in the original Arc challenge.
1:01:09
Now you spoke about developer aware generalization. What is it and why is it so important? Right.
1:01:16
So developer aware generalization is decided that well, if generalization is the ability to adapt to things that are different from the things
1:01:25
you've experienced before, um, then it kind of matters what a
1:01:31
frame of reference you're taking. Are you taking the frame of reference of the agent? Does it matter if this agent is
1:01:38
able to adapt to things that it has not in person experienced before? Or do you take the frame of reference of the developer of the agent?
1:01:48
Are you trying to get the agent to adapt to things that the developer of the system could not have anticipated?
1:01:56
Um, and I think the correct frame of reference is the frame of the
1:02:01
developer, because Otherwise, what you end up with is the developer is going to build into the system either via hard coding or via pre-training.
1:02:12
Um, the right kind of, uh, models and data so that the agent is going to be
1:02:19
capable of performing very well, but without actually demonstrating any kind of generalization, just by leveraging the prior
1:02:26
knowledge that that is built into it. The current, um, arc benchmark.
1:02:34
I just wondered if you could comment on on its weaknesses, but just to cite a couple of examples. Melanie. Melanie Mitchell put a piece out
1:02:41
saying that it should be a moving benchmark. And Dileep George put an interesting piece out saying that it might be perceptually entangled in a way that we might not want.
1:02:50
So what are your reflections on the potential weaknesses of it? Sure. I mean, ockhi is a first attempt at capturing my measure of intelligence.
1:03:00
It's a pretty crude attempt because of course, you know, I'm technically limited in what I can produce. And it has, of course, pretty,
1:03:09
pretty strong limitations. So I think the first limitation is that, um, it might be falling short of its goals in terms of
1:03:17
how much diversity there is into it and how much novelty.
1:03:22
So some tasks in a version one of ArcGIS, because by the way, that's
1:03:28
going to be version two as well. So some tasks are actually very close to each other. There is some redundancy.
1:03:34
And they might also be very close to things that exist online, some of them, and which might be actually one of
1:03:42
the reasons why you see LMS uh, able to solve some percentage of
1:03:48
or maybe they're actually doing it because they've seen similar things in their training data. So I think that's the main floor.
1:03:55
Um, and um, so yeah. So Melanie Mitchell mentioned you
1:04:00
know this is a benchmark like this should be a moving benchmark. I actually completely agree. I think ultimately to measure
1:04:09
intelligence you're going to want not a static data set.
1:04:14
You're going to want a task generation process. And you're going to ask it for a new task.
1:04:22
It's going to it's going to be capable of giving you something that's very unique, very different, handcrafted just for you.
1:04:29
It's going to give it to you. And then it might try, for instance, to measure, uh, how data efficient you are in solving the task.
1:04:39
So it's first going to give you maybe 1 or 2 examples are going to challenge you to figure it out. And if you cannot then maybe it
1:04:47
can give you a couple more and then a couple more. And that way. So the reason why something like this would be interesting is that
1:04:53
you can start benchmarking, um, approaches that have very low
1:04:59
intelligence, like for instance, curve fitting via gradient descent. Technically, curve fitting via gradient descent is a kind of
1:05:07
program synthesis, so you should be able to apply it on Arc. The main reason why you cannot is because for each task,
1:05:15
you only have a couple of examples, and the space is not interpretative, so it doesn't really work. Curve fitting doesn't really work.
1:05:21
But if for each task you had 1000 examples, for instance, it could be conceivable that you could fit a curve that will
1:05:29
generalize to to novel inputs. Well, if you have this dynamic task
1:05:34
generation and example generation system, then you can start benchmarking techniques like this. And it will be interesting
1:05:42
because then you can start grading on the same scale. Um, fitting a transformer via gradient
1:05:50
descent versus program search. Uh, brute force program search, heuristic program search, deep learning guided program,
1:05:57
search and so on. And then you can start seeing the very concretely what it means to be more intelligent, what it means
1:06:04
to be more data efficient in your ability to produce generalization. And the other thing that you can start creating when you have
1:06:13
this sort of dynamic benchmark generation process is you can start
1:06:18
grading how much generalization power different systems have.
1:06:23
So you can you can measure how data efficient your your synthesis,
1:06:28
your model synthesis processes, but also how much generalization power the output model has, because you can, uh, challenge the
1:06:38
test taker with different inputs that will be more or less difficult. So you start at the lowest level by demonstrating a task with
1:06:47
very few examples. And let's say, for instance, very, um, very simple test inputs. And as you go further,
2.5 Task Generation and Benchmark Design
1:06:55
you're going to add more examples to kind of kind of refine the constraints of the problem. But you're also going to send the
1:07:02
test taker much more difficult examples of the problem to kind
1:07:09
of test how far it can generalize or how complex the models it can produce can be. I love this idea of a generative arc,
1:07:19
and I could see you ultimately, Arc will be a generative benchmark. Yes.
1:07:24
And I guess that is similar to the way things work in the world. So there's a generative function of the universe.
1:07:29
It produces the kaleidoscope, and we go backwards from the kaleidoscope to the generative function. But knowing this is the thing,
1:07:37
like we in this intelligence process, we need to know what the priors are. And the priors must be either fundamental or deducible from the
1:07:45
fundamental priors that were there in the first place. Yes. That's right. And, you know, I think the big pitfall to avoid here is.
1:07:53
And that's actually the reason why, um, I did not release arc one as
1:08:01
a generative benchmark. This was, by the way, uh, the first direction I investigated when I was trying to come up with the
1:08:10
thing that eventually became Arc. Um, I was thinking that I would I would create a program synthesis benchmark where the,
1:08:20
the test examples would be created by some kind of master program. And, and I investigated many different directions, um, things
1:08:30
like cellular automata and so on. Like, for instance, you're, you're given the output of cellular automata, and you need to reverse
1:08:37
engineer the rules that produce it, that sort of thing. Um, and ultimately so I did not go with that for several reasons.
1:08:43
So one reason is that I wanted the tasks to be easy,
1:08:48
intuitive for humans. And that's actually difficult to achieve in this way. I also wanted to avoid formalizing
1:08:57
too much of the core knowledge, because any formal formulation of
1:09:04
core knowledge might be losing something, might be missing something important that you cannot really put into into words. But that is there.
1:09:14
And also because and that's very important. If you just write down one master program and let it generate your
1:09:22
data set, then the complexity of the tasks in your data set is fundamentally limited by the complexity of the master program.
1:09:29
And so as someone trying to solve the benchmark, the only thing I have to
1:09:35
do is reverse engineer the master program, and then I can use it, for instance, to generate infinitely many tasks that it can fit.
1:09:43
I could fit a curve to, or I just hard code the system that already understands, sand and already understands how
1:09:50
this master generative function behaves and can anticipate it, right. So it can hack the benchmark. Um, and that's why ultimately I
1:09:59
ended up with this model where every task in Rq1 is actually
1:10:04
handcrafted by me in this case. And I think that's touching on,
1:10:10
on something that um, is, is is subtle but very important,
1:10:16
which is that I'm a big believer in the idea that the solution to
1:10:24
the problem of intelligence must be co-evolved with the challenge.
1:10:30
The benchmark, like the benchmark, should be a tool that points, um,
1:10:37
researchers in the right direction, that is, asking the right questions.
1:10:42
But to ask these questions, uh, that is in in itself.
1:10:47
That is a complex problem. So I think if you if you were capable of coming up with a master program that generates a
1:10:55
test of intelligence that is, uh, rich enough, complex enough,
1:11:02
novel enough, interesting enough to be a true test of intelligence. Uh, coming up with that program is as hard as coming up with AGI.
1:11:11
It is, in fact, the same kind of thing. You basically need AGI to create to create a the challenge that
1:11:19
AGI is a solution to. Right. How explainable should these programs be? I mean, as an example,
1:11:26
you could explain to me the reason why you got a coffee this morning or something like that, and I would understand, but AGI presumably
1:11:33
would be able to build models for things that we don't understand, like, um, economics or financial markets or something like that.
1:11:39
It would be an inscrutable, uh, mess. So how could that work?
1:11:44
Well, yeah. yes. So AGI would be capable of approaching a new problem, a new task, a new domain, and, uh,
1:11:52
very quickly and very efficiently from very old data coming up with a model of that thing. And that model should be predictive.
1:12:00
So it should be able to anticipate the evolution of, of the system it's looking at in the future. Um, I think it should also be,
1:12:09
uh, causal. So you should you should be able to use it to plan towards goals like you can imagine.
1:12:15
Like I have this model of the economy, for instance. I want to get it towards this state. Here are the interventions I can
1:12:25
make that will actually causally lead to to to desired state. So it should be a predictive model, a causal model that you can use
1:12:34
to sort of like simulate the behavior of of of the system. Um, and I think that actually makes it inherently The interpretable.
1:12:44
You don't need to explain how the model works. You can you can just show it in action.
1:12:50
So one example is let's say we are looking at Arc. We're not looking at the economy anymore. We're looking at a task in arc AGI. Um, currently most of the
1:13:02
program synthesis approaches, they are looking for input to output transformation programs. And if you're not reading the
1:13:10
contents of the program, then one way you can interpret them is just running them on a test input and seeing what you get.
1:13:18
I think the kind of model that an actual AGI would produce in this
1:13:25
case, they would not just be input to output transformations, they would explain the contents of the task. So they would be programs that
1:13:33
you could use, for instance, um, to produce new instances of the task,
1:13:38
right? Or even to go from output to input when applicable, instead of just going from input to output.
1:13:44
And such a kind of program is extremely interpretable because you can just, uh, ask for new examples and then look at them. Right? Okay.
1:13:56
So I can imagine there might be some kind of mediated interface which does encapsulation, you know, we understand the interface,
1:14:03
but maybe we should think about this the other way. So when I've spoken to AI researchers, I've gone through Arc
1:14:08
challenges together with them. And they are trying to look at their introspection. So they're saying, I'm looking
1:14:15
at this problem and I know it's got something to do with color. I know it's got something to do with counting.
1:14:21
And and then they run the program in their mind and they say, one, two, three. No, that doesn't work. That doesn't work.
1:14:27
And and then they try and formalize that into some kind of an approach. Do you think that the way we introspect is a useful way to build
1:14:36
a solution for the Arc challenge? I think so. I think introspection is very effective when it comes to
3.1 System 1/2 Thinking Fundamentals
1:14:42
getting some idea of how your mind handles system two thinking.
1:14:48
I think it's not very effective for system one, because system one is inherently not something you have direct access to.
1:14:54
It happens unconsciously, instantly, in in parts of your brain that
1:14:59
you're not directly observing via your own consciousness. But system two is not like that. System two is very deliberate.
1:15:07
It's very slow, very low bandwidth. There's only, you know, a few things happening at any given time. And it's very introspective.
1:15:15
So I think what you're describing, this idea that you're looking at a new task, you're trying to describe it via a set of properties in your
1:15:25
mind, and then you're coming up with a small number of different
1:15:30
hypotheses about what could be some programs that match these,
1:15:36
these descriptive constraints, and then you're trying to execute them in your mind to check that your intuition is correct.
1:15:41
I mean, that's kind of cool. System two thinking, right? I think that's basically how program synthesis works in the brain.
1:15:49
But what's not mentioned here is all the system one parts that are in
1:15:57
support of this system two thinking. I'm really a big believer in the fact that no cognitive process in the human mind is pure system
1:16:06
one or pure system two. Everything is a mix of both. So even when you're doing things that seem to be extremely reasoning heavy,
1:16:13
like solving arc or doing math or playing chess or something,
1:16:19
there's actually a ton of pattern, cognition, and intuition going on. You're just not noticing it, right? And it takes the form, for instance,
1:16:30
the fact that you're only looking at maybe 2 to 4 different possible
1:16:36
hypotheses for your task. In reality, the space of potential programs is is immense. There's like hundreds of
1:16:45
thousands of possible programs you could be looking at. But no, you're only looking at like 2 or 3.
1:16:50
And what's doing this reduction? Is your intuition, right.
1:16:55
Or pattern recognition? It is system one. And I think the reverse is also true. Even when you're looking at cognitive
1:17:03
processes that seem to be extremely system one like perception,
1:17:08
for instance, there's quite a bit of system two elements when I
1:17:15
think perception, for instance, is very, very compositional. It's not pure input to output matching the way a deep learning
1:17:22
model would do it. There's actually quite a bit of generalization via composition that happens, and that is actually system two. I really agree that there's some
1:17:29
strange entanglement between the two systems. I mean, there was one task where color certainly had something to
1:17:35
do with it. Select. You know, you can almost visualize it as a SQL query, you know, grouped by the colors.
1:17:41
Select counts order in descending order. Skip one, take three.
1:17:47
You know, that kind of thing. And it's similar to abduction in the sense that there's this perceptual inference happening
1:17:54
to this set of hypotheses. And and then at some point I'm doing some post hoc verification, which really does seem like system two.
1:18:01
But but the whole thing seems to work together in a symphony. Yes. And they are so intermingled that maybe saying that we're looking
1:18:12
at system one plus system two or system one versus system, maybe that's the wrong framing. Maybe what we are looking we're
1:18:20
looking for is actually a different kind of data structure or substrate
1:18:26
that underlies cognition. That is inherently both system one and system two. To, um. But yeah, what you're doing in
1:18:35
your mind as you describe is basically program synthesis. But that program synthesis is very, very heavily guided by perceptual
1:18:42
primitives and just by intuition about what you feel like, what you
1:18:49
feel might be the correct solution. So when we implement programming
1:18:56
synthesis in a computer, I mean, we could just do a naive, greedy brute force search. And then we have this combinatorial
1:19:03
explosion. Tell me about that. Right. Um, the primary obstacle that
1:19:09
you run into if you're doing program synthesis. So program synthesis is that very high level. It's you have a language.
1:19:19
So typically it's domain specific because that's the shortcut. So it's not like a language like Python. It's a language that's a little bit more specialized than that.
1:19:26
Um and you have a bunch of functions in this language and you use them to create programs. A program is basically just a
1:19:35
composition of these functions into something like in the case of Arc,
1:19:40
it's typically going to be a program that takes as input, um, an input grid and produces the corresponding output grid.
1:19:48
And the way you do program synthesis is that you try a bunch of compositions of these functions. And for each, each one, each program,
1:19:58
you're going to run it in practice. So run it on a target input, look at the corresponding output and check whether that output is
1:20:07
the output you expected. And you do that across all the examples that you have available across all all the programs that
1:20:14
you can come up to. And then you look at which are the programs that actually match, actually produce the correct outputs
1:20:22
across all the examples. Right. And maybe you have one, one such program that's a match. Maybe you have ten and then you
1:20:30
must make a selection. You must try to guess which one is more likely to generalize. And typically it's going to be
1:20:36
the shorter one. But the huge bottleneck that you face is that, um, the size of program space, like the number
1:20:45
of programs you have to look at, grows combinatorially with the number
1:20:51
of building blocks in your DSL, but also with the size of the program. So if you are looking for programs that involve, for instance,
1:20:58
40 different function calls, you're looking at a very, very large space. So you could not possibly iterate over every individual
1:21:08
element of that space. So that's the combinatorial explosion bottleneck. And humans clearly do not suffer
1:21:16
from this problem. Like you described this introspection process. When you're looking at a task and
1:21:23
you're only executing a very small number of programs step by step, and you're only really executing them to verify that they're actually correct.
1:21:33
You apparently rely on an extremely powerful kind of intuition that
1:21:41
is not entirely reliable, which is why you still have to perform this verification step. It does not give you the exact right
1:21:46
answer. Kind of kind of like an LLM. Um, I believe what they are doing is actually the same kind of cognitive process.
1:21:53
It's it's pattern matching, right? It's intuition. So you still have to verify, but it's directionally correct.
1:21:59
It's doing a really, really good job at sifting through pretty much this almost infinite space of programs and reducing
1:22:08
it to just a few possibilities. And I think that's actually the
1:22:13
really hard part in cognition. It's this redaction process. So there are some interesting approaches to work.
3.2 Program Synthesis and Combinatorial Challenges
1:22:19
So I spoke to Jack Cole and Ryan Greenblatt. And then there's there's the dreamcoder type approach.
1:22:25
Maybe we should start with Dreamcoder because, you know, Tanenbaum's group at MIT. And, you know, Kevin Ellis was the
1:22:32
author of the Dreamcoder paper, and he's actually working with Zenna Tavares building a lab called basis. I spoke with them the other day,
1:22:40
and they are very much focused on the Arc challenge, and they're implementing a lot of MIT's work on the Arc challenge,
1:22:47
which is which is really cool. But I guess, like the the elephant in the room is that Dreamcoder? And please introduce what that is.
1:22:53
It's a really elegant, beautiful approach to arc, but unfortunately it doesn't work very well yet. Right. So it's been a while since I read
1:23:02
the paper, but my recollection of Dreamcoder is that it's a program
1:23:08
synthesis technique that tries to create a bank of reusable primitives
1:23:16
that it is actually developing, kind of like as it gets used to
1:23:22
to solve new tasks. Asks. And I think that's a fundamentally right idea, and it's probably the only system in which I've seen.
1:23:33
I've seen this idea in action, this idea of abstraction generation that you're going to use your experience and your problem solving
1:23:41
experience to try to abstract away functions that you're going to put
1:23:46
in your DSL for, for reuse later. I also remember it had this wake
1:23:53
sleep cycle. So I think that was to um, train.
1:23:59
So the the synthesis component that they had leveraged deep learning and
1:24:05
they were training the deep learning model via the the wake sleep setting. Can you can you correct me? Yes. So they had a neural network
1:24:13
generative model for programs, and then they had a sleep phase where they would retrain the generative model and something
1:24:20
called an abstraction sleep, where they would kind of combine together programs that worked very well and discard ones that
1:24:26
weren't being used very well. You know, that kind of thing. Yeah. Yeah, that's that's what I usually call abstraction generation.
1:24:32
Like, I see intelligence as having two critical components. Synthesis, where you're taking your existing building blocks and
1:24:40
assembling them, composing them together to create a program that matches the situation at hand. Right. And then there's abstraction
1:24:47
generation, where you're looking back on the models you've generated and or just your, your, your, the data you got about the world and
1:24:58
you're trying to mine it to extract reusable building blocks that you're sending to your memory, where you can reuse them the next time around.
1:25:06
And yeah, and Dreamcoder was actually trying to implement these two components, which I think is really the right
1:25:14
direction. So it's very promising. So what about Jack Cole? What do you think of his solution. And that's the Mind's Eye group
1:25:21
on the leaderboard, right? So what they are doing is basically they're doing an LM. So it's it's an encoder decoder
1:25:28
model that's based on on T5. On the T5 architecture. They are pre-training on a large code and math data set because
1:25:38
apparently it helps, which on its own it's an interesting finding. Um, and then they are further fine tuning it on millions of
1:25:48
generated arc log tasks. So they're producing programmatically lots of tasks that look like R tasks, and they are fine tuning the model
1:25:58
on it. When I say fine tuning. So they are basically for each task, uh, they are tokenizing the task description.
1:26:05
They're reducing it to a sequence of tokens. So that's that's actually pretty easy. Uh, feeding that into the LM.
1:26:10
And they're expecting to produce the output grid in tokenized form. And then they're decoding that back out.
1:26:16
And And so just the setup I described on its own, as it turns out,
1:26:24
does not perform very well. It does lack a few percent, but they added a really powerful twist, which is that they are
1:26:31
doing test time fine tuning. So they are taking their pre-trained LLM and at inference time on each new task, they are producing a
1:26:42
fine tuned version of the LLM. So they are doing that by producing variants of the task by applying a bunch of randomized
1:26:52
hardcoded transformations. Basically, um, and they're turning that into sort of like mini training data set.
1:26:59
They're fine tuning the LLM on that training data set, and then they are applying that fine tuned model on the test input
1:27:07
and producing a test output. Um, and if you think about it, so just this test time functioning trick is actually getting their model
1:27:16
from a very, very low performance, like a small percentage of tasks solved to, you know, over over 40%, which is very impressive.
1:27:26
So if you zoom out by a lot, I think what they are doing is not that different from program search. It's basically a at a different
1:27:38
point on the spectrum. So you can think of programs such as a as a spectrum with two axes. One axis is like the richness and
1:27:48
complexity of your DSL, of your bank, of reusable building blocks.
1:27:54
And the other axis is the richness and complexity of the ways that you
1:28:01
recombine these building blocks. And, um, discrete program search
1:28:07
typically is going to operate over a very, very small DSL, like a DSL with maybe 100 to 500 Primitive functions in it,
1:28:16
but it's going to recombine them in very complex ways to get programs
1:28:22
that may have depth 20, for instance. And what Jack Cole is doing is
1:28:28
basically turning his l.l.m. into a a database of reusable vector
1:28:38
functions. And it has millions of it. So it's very, very broad, very large DSL in a way. And then this term fine tuning is
1:28:46
using gradient descent to recombine these primitives into a new program.
1:28:53
And by the way, the fact that you have this huge performance jump from not using test time funding to using test time funding really
1:29:02
highlights empirically the fact that recombination program search is a
1:29:07
critical component of intelligence. If you're just doing a static inference, You're not doing any any sort of recombination.
1:29:14
Or if you're doing it, it must be, um, some form of in-context learning.
1:29:20
So basically, uh, using a memorized recombination program, um, if,
1:29:27
if, if you're only doing static inference, you basically do not display much intelligence at all. If you're doing recombination
1:29:36
via test time, fine tuning, then you are starting to implement the synthesis components of intelligence that I described.
1:29:44
And the problem is that gradient descent is a very weak, very data
1:29:50
inefficient way of doing synthesis. It is in fact the wrong paradigm. And so what you get is that the resultant programs have a very
1:29:59
shallow depth of recombination. Right. So on the on the program synthesis spectrum, um,
1:30:06
the Mindseye solution is this point where they're really maxing out
1:30:11
on the richness of the DSL axis, but they are very, very low on
1:30:16
the depths of recombination axis, whereas a discrete program such as it's usually implemented, is on the complete other side of
1:30:25
the spectrum where you have a very, very small, very concise DSL but very sophisticated recombination. Right. And intuitively,
1:30:33
my guess is that what makes human intelligence special is that it's
1:30:39
not at either end of the spectrum. It's somewhere in between. You have access to a very large, very rich bank of abstractions,
1:30:49
of ideas and patterns of thought, but you're also capable of recombining them on the fly to a very meaningful degree.
1:30:57
You're not doing a test on fine tuning in your brain when you when you're coming up with novel ideas, you're not doing gradient
1:31:03
descent at all. You are doing some form of discrete program search, Uh, but you're doing it on top of this very,
1:31:10
very rich bank of primitives. And that enables you to solve any art
1:31:16
problem pretty much within seconds. I remember reading your Deep Learning with Python book many years ago, and you were talking about the
3.3 Test-Time Fine-Tuning Strategies
1:31:22
perils of fine tuning. You have to have the learning rate quite low because you might damage those representations in
1:31:28
the base model. And when I spoke with Jack, he said that I'm not sure how much of it I should say publicly,
1:31:34
but he encoded the the fine tuning in a kind of language which would
1:31:40
reinforce the existing manifold of, of, of the model. So, you know, he was kind of like saying, I want to use it as a foundation model by transforming the descriptions
1:31:48
in a way that that reinforces it. And, um, and also the, the active inference thing, it's not active inference from a
1:31:56
freestone point of view, but the test time inference that is moving away from what you said earlier, which is that it's not a retrieval system.
1:32:02
I'm actually now generating new compositions as as part of the inference process. That's correct. It's not just a retrieval system.
1:32:09
When you when you're just doing static inference with Elm, you're just prompting it, getting back some some results.
1:32:17
That's pure retrieval. And there's very little recombination happening. Any recombination if it happens,
1:32:24
must go through one of these, uh pre-learned recombination programs,
1:32:31
like some people say that, um, in-context learning is leveraging
1:32:37
some kind of hard coded gradient descent algorithm that's latent in the LM. So maybe that's happening. But whatever is happening clearly,
1:32:44
empirically, we can see that it doesn't work very well. It doesn't adapt to novelty to very meaningful extent.
1:32:50
But if you add test time fine tuning, then you are actually starting
1:32:56
to do real recombination, right? You're not just reapplying the
1:33:01
programs stored in the LM, you are trying to, to modify them, to recombine them into something that's custom to the task at hand.
1:33:11
That's the process of intelligence, right? My I think directionally this is the right idea.
1:33:17
The only issue I have with it is that gradient descent is just a terrible way to do recombination. I mean, it is it is a program
1:33:25
synthesis algorithm, of course. Right. It's just the wrong approach.
1:33:31
So in which case, I mean, I had this discussion with Jack when I interviewed him. But while I accepted that it's a
1:33:37
general method, of course it's still domain specific in the sense that you have to come up with a prompting technique in order to fine
1:33:43
tune the language model and so on. But but it could in principle be applied to, you know, fairly broad domains of, of problems.
1:33:49
But you would agree, though, that it goes against the spirit of your measure of intelligence. So there are there are elements of
1:33:56
the approach that are not quite in line with the spirit of the, of the competition. I think in particular the idea that,
1:34:03
is going to pre-train his LLM on millions of generative art tasks. So this kind of makes me think of an attempt to anticipate what might
1:34:13
be in the in the test dataset in a private test set, and try trying to
1:34:20
generate as many tasks as possible and hope for collisions between
1:34:25
what you've generated and what's actually going to be in the test set. So that, of course, is trying to hack the benchmark via memorization.
1:34:35
It is not what we intended, but, you know, ultimately it is up to us,
1:34:41
the creators of the benchmark, to make sure that it cannot actually be hacked via memorization, that it is resistant to memorization.
1:34:48
If we did a bad job with that, because it's actually possible to anticipate what's in the private test set, then that's on us.
1:34:55
So in practice, by the way, I think we did a decent job because that.
1:35:01
So if you're not doing some fine tuning right, you're only getting a very low accuracy on the test set. So it kind of shows that yes,
1:35:09
the test set is actually decently novel, right. Having this also shown by the fact that the best LMS right now, if
1:35:17
you're just doing direct prompting, they're doing so the best one is close 3.5. It's doing 21% right. So it kind of implies that, uh,
1:35:28
about 80% of the data set is decently novel, right? Even if you if you use as your frame of reference the entirety
1:35:37
of the internet, pretty much. So that's actually a good sign. But I think, you know, in in the Jackal's approach, there are also,
1:35:44
uh, the overall approach is in, in the spirit of what I had in mind,
1:35:50
because what it's doing is a form of program synthesis. It's just that it's gathering. Uh, via via learning is gathering
1:35:59
this enormous DSL, right? And then it's doing very, very shallow combination and doing it with gradient descent, which I think
1:36:05
is is not what you should be doing, but it ends up working right. So why not? I agree with that. So. So actually in spirit it's the
3.4 Evaluation and Leakage Problems
1:36:13
right approach. But it's bottlenecked by stochastic gradient descent on a on a large language model. But this is just an interesting segue though.
1:36:20
So again, in your deep learning with Python book, I think around chapter four, it's very pedagogical for folks who want to learn about machine learning. You spoke about the leakage problem.
1:36:27
So, you know the reason why we have a training set and we have a validation set and a test set is we don't want information to leak between the sets
1:36:35
and it can happen inadvertently. So for example, every time someone gets a new score on on the the Arc challenge,
1:36:40
it's tested on the private set. And that's information. And people then modify their approach, and it's as if they've
1:36:46
seen something in the private set when when they haven't seen it directly. That's correct. And what they've seen is that
1:36:51
this approach they've tested performs better. So now they've learned something about the contents consonants of
1:36:58
the of the private test set. And yeah, like many folks, even, you know, folks who are machine learning experts, they have this,
1:37:07
um, misconception that you can only overfit if you are directly training on something. If you're if you're using this
1:37:15
training data, that's not the case. So for instance, some years ago, people were doing neural architecture search to find new
1:37:24
covenant architectures that would perform well on ImageNet. They all used ImageNet as their reference.
1:37:32
And what they were doing is that they were mining this enormous space of possible architectures and selecting the ones that ended up
1:37:40
performing well when trained on, on, on ImageNet. And what you ended up with was an architecture that was at the
1:37:49
architecture level, Overfits to the the ImageNet evaluation set. right.
1:37:56
Um, in general, if you have any sort of process that extracts information,
1:38:03
even even just a few bits of information from your evaluation dataset and is re-injecting this information back into your model,
1:38:09
even if it's not an automated process, even if it's if it's just you looking at the results and then tweaking the approach by hand,
1:38:17
you are starting gradually to overfit to, to to what you're testing on.
1:38:22
And ultimately this would happen with the, the, the private test set of rtxgi. It's just that because the,
1:38:31
the only bit of information you get is time you submit something is your total score. You're really not extracting
1:38:37
many bits of information. Right. Um, but eventually, because each participant can make three submissions a day and there
1:38:46
are many participants eventually would start overfitting, um, which is part of the reason why we're going to release a version
1:38:55
two of the data set. And by the way, with version two data set, we are going to do something that is pretty important. That should have been done earlier probably, which is that we are
1:39:03
going to we're going to have two private test sets, right. There's going to be the one that we evaluate on when you submit
1:39:12
and for which you see the score. That's going to be the publicly viewable score. But then we're also going to have an extra private one, which we are only going to evaluate your your solution
1:39:21
on at the end of the competition, so that you're going to proceed through the competition by only getting this feedback signal that
1:39:28
here's how well you perform on the first private test set. Right. But at the end, we're going to swap that out with the new one.
1:39:36
And then you're going to hope that your model will generalize to it. Hope being the operative word. Yeah. Yeah.
1:39:44
I mean, now might be a good time to talk about our friend Ryan Greenblatt from Redwood Research. I interviewed him.
1:39:51
He's a very, very smart guy. I enjoyed talking with him, and he did a kind of, uh, you know, let's generate loads and
1:39:58
loads of candidate programs with an LLM and then validate them in a kind of he didn't want to call it a neurosymbolic framework,
1:40:05
which I thought was curious. But what do you think about his approach? Yeah, I think that's directionally
1:40:11
that's the right approach. You know, we we kind of described how, uh, when you are solving another task,
1:40:18
you are generating a small number of hypotheses and they are programs, and then you are actually executing them in your mind to verify whether,
1:40:28
whether they're correct or not. Right. Uh, it's the it's the same kind of process where you're using a
1:40:33
big intuition machine to produce candidate programs. And these candidate programs, you're hoping that they are more or less
1:40:41
right, but you're not sure, right? So you still have to verify them. Uh, via via a system two type process, which in in this case that's
1:40:52
going to be a code interpreter. In your case, you're actually literally going to be executing the programs in your in your head.
1:41:00
Um, I think that's that's basically again, the same type of program
1:41:06
search approach that we are seeing among the folks that are doing brute force program search, or the mind's eye approach is
1:41:14
just a different point on the program synthesis spectrum. But it's the same kind of thing, right?
1:41:21
And and in general, you know, I think the, the research direction that is the most promising to me is combining deep learning with
1:41:31
discrete program search. Maybe not quite what Ryan Greenblatt is doing, but the idea that you're going to use a deep learning
1:41:39
model to guide, program, search, that it it has to look at fewer
1:41:44
candidate programs or subprograms. That is absolutely the right idea. Right. So I'm not surprised that he's
1:41:51
getting good results. And I do expect you are going to keep seeing even better results from variants of this approach.
1:41:59
So one thing I would change is instead of generating end to end
1:42:06
Python programs and then just having a binary check, is it correct or not?
1:42:11
I think it might be more interesting. Um, it might be a better use of
1:42:17
DM to generate modifiable graphs built on top of an arc specific DSL,
1:42:25
and then instead of just checking whether the program is correct or not, you might want to do a local, discreet search around your
1:42:33
candidate programs. Basically, use your candidate programs as a seed points, like starting points for discreet
1:42:42
search to reduce the amount of work that the discreet program search process has to do and in general use. I keep repeating this,
1:42:51
but you should use. LMS as a way to get you in the
1:42:57
right direction, but you should never trust it to. Land in the exact right spot. You should assume that where you
1:43:04
land is probably close to. The solution, but is not exactly the solution. You're still going to have some
1:43:09
some amount. Of manual work to do to to to go from the points like for instance, the candidate programs.
1:43:15
That the DM produced to the actual solution. And that work has to be done by a system. Two type process.
1:43:21
Yeah, I discussed this with him and he still is of the mind that they are doing. Emergent reasoning and given
3.5 ARC Implementation Approaches
1:43:27
enough scale that the divergence between aleatoric risk and. Epistemic risk will tend towards zero.
1:43:33
Which of course we don't agree with. But I agree with you that. Wouldn't it be interesting if it's quite stateless,
1:43:39
the system at the moment? Wouldn't it be interesting if there was some kind of program library and maybe retrieval augmented
1:43:45
generation into the library. He does have some interesting properties to the solution, which maybe might want to comment on. He's using vision. He's doing some interesting
1:43:53
prompting. He's using self reflection. He's got like a candidate evaluation methodology.
1:43:58
And what do you think about the overall thing? Sure. Um, I think it's promising. And yeah, you know,
1:44:05
I think we're going to we're going to keep seeing variants of this that are going to perform well. And this is this is the reason
1:44:12
why we introduced the public track in the challenge. You know, we kept hearing from folks saying, hey, I'm sure GPT
1:44:19
four can can can do this. We were like, well, maybe let's try it. Um, and of course, you cannot enter
1:44:27
the private competition with GPT four because it would it would involve sending the private tasks that are to the OpenAI service.
1:44:35
So it would no longer be private. So that's not possible. So what we did is that we introduced an alternative test set right,
1:44:42
which we call a semi-private. So it's it's private in the sense that we are not publishing it, but it's also not quite private because
1:44:48
it is being sent to OpenAI servers and or anthropic servers and so on. Um, and um, we did this because we want people like Ryan Greenblatt
1:44:59
to show up and come up with some, uh, sophisticated, uh, chain of that pipeline and prove us wrong, if possible.
1:45:09
And just before we leave this bit, are you aware of any other interesting approaches which perhaps aren't in the public domain,
1:45:16
but you know about. So I am aware of various people making claims, uh, about about their solutions to Ark, but I'm
1:45:27
not aware of specific details. They tend to be very secretive people, and ultimately I only trust what I see. We have two tracks.
1:45:36
We have the private track on Kaggle. There's a lot of money on the line, and we have the public track where you can use any set of the
1:45:41
item you want. If you if you have something, you should submit it to 1 to 1 of the two tracks.
1:45:48
If it's self-contained, then just go for the money. If it uses an API, then use the public track.
1:45:54
But if it's not on the leaderboard, I'm probably not going to be. I'm not going to believe you. Are the organizers worried that
1:46:01
if someone did reach human level performance, that it would be worth more than $1 million if they sold it somewhere else? Um, sure.
1:46:09
Maybe I, I doubt that's what's going to happen though, but maybe. Interesting. And also, um, just on the
1:46:18
economics of it, this is quite an open source approach, but what do you think the incentives are? Because if I already had a really
1:46:26
good solution, if I was Jack Cole, I mean, I would. It's worth me spending six months on it because there's a good chance I might win. If I have nothing,
1:46:33
then maybe I'll just have a quick look and see if there's anything. But I won't invest much time and versus start up a lab and put
1:46:40
the money into that and just hire good people to work on it. So of course, there's a there's a big money prize.
1:46:47
But, you know, we don't expect that people are going to show up and solve Arc because they want the money. Specifically,
1:46:54
the amount of money is not high enough that this is going to happen. Instead, the money that you are putting
1:47:00
on the line is just a signal to indicate that this challenge matters.
1:47:07
And we are serious about it, and we think it's important. But ultimately, the real value that there is in, in submitting
1:47:15
a solution and winning is, I would say, a reputational value. It's like you become the first person to crack this open
1:47:23
challenge that's been that's been opened since since 2019. And presumably your solution is a big step forward towards AGI.
1:47:32
And a lot of people are talking about Arc right now. If you were to solve it, You would definitely make headlines,
1:47:39
right? It would be a big deal. So, for instance, you mentioned starting a lab. Well, it would be a great opportunity
1:47:46
to start a lab around your solution and then raise a bunch of money. Right. And you could do that just just
1:47:53
on the momentum generated by your your winning entry. Could you comment on you know, I had Saburo Kobayashi on recently and he's
1:48:02
got this LM modulo architecture, which is really interesting. You know, basically you have this neurosymbolic, you know,
1:48:08
lm generating ideas, critics. What do you think about that general idea? Yeah, I think that's generally
1:48:15
the right approach. Like, you should not blindly trust the output of an LM. Instead, you should use it as an
1:48:23
intuitive suggestion engine. It will give you good candidates. But you should never just blindly believe that these these
1:48:32
candidates are exactly the correct solution that you're looking for. You should verify. And this is why LM modulo some
1:48:38
external verifier is so powerful. It's because you are cutting through a the the combinatorial explosion problem that would
1:48:46
come with trying to iteratively trying every possible solution. But you're also not limited by the fact that lamps are terrible
1:48:56
at system two. Right. Because you still have this last mile verification. And that's going to be done by
1:49:02
true system two solution. The architecture is really interesting because it was bidirectional as well.
1:49:09
So the outputs, you know, like the verifiers might give you yes or no maybe or some additional information. And then the other lens could be
1:49:15
fine tuned and so on. But but my read on it though is that it brutalizes it a little bit because the verifiers of course are very
1:49:21
domain specific, and that seems to be slightly different to some of the solutions to the Arc challenge. Yeah,
1:49:29
it will tend to be domain specific. And also it's it's not always
1:49:35
the case that you're operating in a domain where there can be an external verifier, right? Uh, sometimes there can be.
1:49:43
I think in particular, this is true with program synthesis from input output pairs. So in particular this is true for AAC. In fact um, because you know,
1:49:51
you know what output you have to expect given certain input and what you're producing can be your producing program.
1:49:57
So it can actually be executed. It can be verified for many other programs. You have no such guarantees, right?
1:50:05
So moving on a tiny bit, um, agency now, I think of agency as
4.1 Intelligence as Tool vs Agent
1:50:11
being defined as a virtual partition of a system that has self causation
1:50:17
and intentionality, allowing for the control of the future. And I assume that it's a necessary condition for intelligence.
1:50:25
And I know you don't, because we spoke about this the other day. But what do you think is the relationship between agency and
1:50:30
intelligence? Um. Mhm. Right. So you know many people kind of treat
1:50:37
uh, agency embodiment intelligence as almost interchangeable concepts.
1:50:44
Um, I like to separate them out in my own model of the mind.
1:50:52
Um, and the way I see it, intelligence is a tool that is used
1:50:58
by an agent to accomplish goals. Um, but it is it is related to.
1:51:05
But it is separate from your sensorimotor space, for instance, um, or your ability to set goals. And I think you can even separate
1:51:15
it out from your world model. So I don't know if you're an RTS
1:51:21
player, maybe. Yes. As in command and conquer. Warcraft, right. Warcraft. Warcraft, exactly.
1:51:29
So all these games are RTS games, and in an RTS game, well,
1:51:34
you have to have units moving around and you can give them commands and you have a mini map as well. So imagine that you're selecting
1:51:42
a unit and you're right clicking somewhere on the mini map to tell the unit to go there. Well, you can think of the mini
1:51:50
map as being a world model, like it's a simplified representation
1:51:56
of the actual world of the game that captures key elements of structure,
1:52:03
like where things are typically and where you are. And when you're clicking the mini map, you are specifying a goal.
1:52:10
And while in this in this metaphor, intelligence is going to be the
1:52:15
pathfinding algorithm, it's taking in this world model, taking in this
1:52:21
goal which are externally provided, and figuring out what is the correct
1:52:26
sequence of actions Patience for the agent to reach the goal. Right.
1:52:31
It's about intelligences, about navigating intelligence, about
1:52:37
navigating future situation space. It's about pathfinding in future
1:52:43
situation space. Um, and in in in this metaphor,
1:52:49
you can see that intelligence is a tool. It is not the agent. The agent is made of many things, including a goal setting mechanism.
1:53:00
In this metaphor, it's played by you. You are setting the goal, and it's made of a world model, which enables the agents to
1:53:07
represent what the goal means and maybe simulate planning.
1:53:12
It's also going to be, uh, including a sensorimotor space,
1:53:17
like an action space. And, and that can that can receive a sensory feedback as well. Um, but the agent is the combination
1:53:28
of all these things, and they're all separate from intelligence. Intelligence is basically just a way to take in information and turn it
1:53:36
into an actionable model, something that you can use for planning. Right.
1:53:41
It's it's a way to convert, uh, information about the world into,
1:53:47
um, a model that can navigate possible evolutions of the world.
4.2 Cultural Knowledge Integration
1:53:53
I agree with everything you've just said. I think the tension is after speaking with people like Karl Friston. You know, when we think about the physics of intelligence and,
1:54:01
you know, this epic particle system we live in with function, dynamics and behavior and so on, um, the agency and the intelligence,
1:54:08
it's not explicit. The world model isn't explicit. So there seems to be something else going on, which is why in many cases,
1:54:15
I think of agency and intelligence as being virtual properties rather than explicit physical properties. That's not to say that we
1:54:22
couldn't build an AI where everything is explicit, because that would be useful. We could we could build it in computers. But there's always the tension of
1:54:28
whether we think of the world as this complex simulation of low level particles and nested agents. I have cells which are agents,
1:54:35
and my heart is an agent, and I'm an agent, or whether it's explicit. All right. Well, I think in the first AGI that
1:54:41
we're going to build are these different components are going to be explicitly separated out in software because that's simply
1:54:49
the easiest way to get there. At least that's my take on it.
1:54:54
The architecture is going to be explicit. Yes. So you actually spoke about functional dynamics the other day,
1:55:01
which was music to my ears. Obviously, being a fan of the Estonian worldview, what's your take on that?
1:55:07
So to be to be honest with you, this is actually, uh, something I've been thinking about, but I do not have very crisp ideas about it yet.
1:55:15
But it is my general intuition as to how the human mind
1:55:20
performs program synthesis. So I think, um, there are, there are two scales, two levels at which the mine, um, changes itself.
1:55:32
There's the, the long term scale, which, which has to do with abstraction mining like abstraction generation and memory formation.
1:55:41
It's um, it has to do with neuroplasticity as well. You are basically changing connections in your brain to
1:55:50
store reusable programs. Your formalism of intelligence focuses a lot on internal representations.
1:55:58
So this idea of in our minds we have a we have a world model and so on. And when I read some of your blog posts from from years ago,
1:56:06
you're talking a lot about this externalist tradition, which is that a lot of cognition happens outside of the brain.
1:56:13
How do you reconcile those two worldviews? Right. Um, well, I'm a big believer that most of our cognition is
1:56:21
externalized, as you say, like when when we are talking to
1:56:26
each other, for instance, we are using words that we did not invent. We are using mental images, ideas that we just read about
1:56:35
somewhere, and so on. Um, and if we had to develop all these things on our own, we would need extremely long lives to start
1:56:42
being intellectually productive. So I don't think there's really any, any contradiction between the two views, like the idea that,
1:56:50
sure, like humans, uh, as individuals are intelligent, you possess intelligence. I possess intelligence, uh,
1:56:58
we can use it sort of, like, in isolation on our own. And we can extract from our environment,
1:57:06
from our lived experiences. We can extract, um, reusable bits,
1:57:11
which we can use to make sense of novel situations. That's the process of intelligence. We possess it as individuals,
1:57:18
but also we were able to communicate, right? We are not. We are not just individuals. We are also society.
1:57:25
So these ideas, these reusable abstractions, we can extract them from our brains. We can put them out there in the
1:57:35
world and share them with others. Like we can write books, for instance. We can type up computer programs
1:57:41
that can be not even just executed by other brains, but even by computers, right? And this process is just the
1:57:50
creation of culture. And then once culture is out there, you can download it into your brain. And that's education.
1:57:57
And as you're doing it, you are sort of like artificially filling up
1:58:03
your bank of reusable abstractions. And it's a huge shortcut. You know, it's almost like downloading a
1:58:11
skills like in The Matrix. It's a little bit of that, like learning about physics, learning about math.
1:58:17
You are downloading these very rich reusable mantle templates.
1:58:26
Like really mantle building blocks. And then you can in your own brain, you can recombine them. You can reapply them on new problems.
1:58:33
It makes you more intelligent, like literally more intelligent. It makes you more efficient at skill acquisition, more efficient
1:58:39
at problem solving, and so on. Yeah. Beautifully articulated. I mean, there's a couple of great books I've read on this,
4.3 Language and Abstraction Generation
1:58:46
the language Game, and also Max Bennett's book on intelligence, basically talking about this, um, the plasticity of memetic information
1:58:54
sharing, you know, allowing us to stand on the shoulders of giants. I think there's a there's an interesting angle to the
1:59:04
question you ask. I know, I know if you were aware of it, but what I've described there is this idea that humans are
1:59:13
the source of, Uh, abstraction. Human individual human brains use
1:59:20
their lived experience to extract abstractions, and then they're
1:59:26
externalizing them via language typically not not exclusively, but most of the time. And then other brains can
1:59:33
download these abstractions and kind of make them their own, which is a huge shortcut, because you don't have to experience
1:59:41
everything on your own to start leveraging these abstractions. Um, but in this model, abstraction generation and
1:59:50
abstraction recombination to form new models is always happening inside brains, right? The only part that's
1:59:56
externalized is the memory. Is that your, uh, moving the abstractions, the reusable building blocks out
2:00:03
of these individual brains, putting them in books and so on, and then and then downloading them back. But to be useful, they need to
2:00:11
be internalized in your brain. A question then is could abstraction
2:00:18
generation or recombination actually happen outside brains as well?
2:00:23
Not necessarily in the context of creating an AGI, because that's exactly what an AGI would be. It would be this, uh, recombination
2:00:33
and abstraction process, this synthesis and abstraction process, uh, encoded in software form. But do we have today like
2:00:42
external processes that, that, that implement this? Well, I think we sort of do I think science in particular is doing a
2:00:52
form of synthesis, uh, that is that is driven by humans, but it is not
2:00:58
happening inside human brains. Like, we have the ability to, uh, do recombination and search over spaces that actually cannot
2:01:08
fit inside human brains. I think you see it Uh, in a lot of the things that we invent, like when you create a better computer,
2:01:18
for instance, you are doing some kind of accumulative search over a space
2:01:24
of possible devices, but you are not really able to hold a full model of
2:01:29
the device inside your own brain. Instead, the model is distributed across some some number of externalized artifacts.
2:01:38
Um, and I do believe that human civilization is implementing this highly distributed, um, synthesis parts of the of the
2:01:48
process of intelligence. It is implemented it externally across many different brains, manipulating externalized
2:01:55
symbols and artifacts. And this is what's underpinning a lot of our civilization, because the systems we've been
2:02:02
creating, we've been inventing, are so complex that no one can really understand them in full. So you cannot Run this.
2:02:11
This invention process inside brains anymore. Instead, you are using brains to drive a
2:02:19
much bigger externalised process. So I think cognition is externalized not just in the sense that we have the we have the power to
2:02:29
write down and then read, uh, ideas, abstractions and then
2:02:35
reuse them inside our brains. We are actually running an intelligence outside our brains as well.
4.4 Embodiment in Cognitive Systems
2:02:41
I completely agree, and you've written about this, about how intelligence is collective situated, um, and and externalized.
2:02:50
But there's always the question of, yeah, many of you know, like science, for example, is, is is a kind of collective
2:02:57
intelligence which supervenes on us and languages as well. But do things like mimesis happen outside of, um, biology?
2:03:06
I mean, certainly it happens in the work, you know, The Selfish Gene. It happens with genetics, but you could argue that a kind of mimesis
2:03:13
actually happens just in any open physical system with certain patterns of functional dynamics and so on. So, um, you know,
2:03:21
the real question, I think, with this externalized cognition is where do the abstractions come from? Perhaps our brains are just very
2:03:29
efficient at building the map from the territory, and it's just a slightly better way of doing what already happens
2:03:38
naturally externally. Yeah. Um, I think to a large extent,
2:03:43
the way we've externalized cognition is, uh, not as efficient as the way we've implemented cognition in our in our own brains.
2:03:51
Um, these externalized cognitive processes, they, you know, so intelligence is a kind of search process right over a space of
2:04:00
possible combinations of a thing. And I think right now this search
2:04:05
process is to a to a large extent externalized when you're looking at technology, when you're looking at science, but it's not
2:04:11
externalized in a very smart way. I think we are roughly implementing brute force search. I see it a lot,
2:04:18
especially in deep learning research. The way the deep learning community as a whole is finding new things is by trying everything
2:04:27
else and eventually hitting the thing that works, you know? And I believe, uh, individual humans actually much if they if they had
2:04:37
enough brain power to actually model these things in their own brains, they would be much more effective at finding finding the right solution.
2:04:45
Interesting. I mean, Ryan Greenblatt's view was emblematic, emblematic of some of the X-risk folks,
2:04:51
and that he was arguing that he can be in a hermetically sealed chamber or be a brain in a vat, and it's a pure intelligence.
2:04:57
He would still be able to reason and solve tasks and so on. And the counter view is that physicality and embodiment is
2:05:05
really important. I mean, when I asked Mary Shanahan this, I said, what's the reason why we need to have physically embodied robots? And he said, well, these robots are
2:05:13
interacting with the real world. They're understanding the intricate causal relationships between things, and that helps them build models
2:05:20
more efficiently. But perhaps in service of just learning about the abstractions which already exist in the physical world.
2:05:26
Yes, to exercise intelligence, it needs to be operating on something
2:05:33
like you think out of something about something like you need to
2:05:38
have some concrete environment and goals in that environment that you want to accomplish and actions that you can take.
2:05:44
So it's about something it cannot be about nothing, but it's also made of something. You are making your plans to reach
2:05:54
your goals based out of existing components, existing subroutines.
2:06:01
If you have nothing at all. You not only you have nothing to be intelligent about, but your intelligence has
2:06:08
nothing to recombine. Right. And that's why embodiment is important. I mean, in humans, you know,
2:06:15
I mentioned this idea that cognition is built layer by layer. Each new layer, which is a little bit more abstract than the one before it,
2:06:22
it is built up in terms of the components that came before.
2:06:29
And if you dig deep enough, if you unfold your mind layer by
2:06:34
layer at the very bottom, you will find things like the sucking reflex,
2:06:40
for instance. It's like it starts. Everything starts with your mouth,
2:06:45
and then you start having things like grabbing objects to put
2:06:52
them in your mouth, and then things like crawling on the floor so that you can reach objects. So you can, you can grab them and
2:06:57
put them in your mouth and so on. And at some point when you stop putting objects in your mouth. But the new things you're learning
2:07:04
are still expressed in terms of this sort of like concept and skill hierarchy, right? And when you end up doing abstract
2:07:12
math, well, you are using building blocks that eventually resolve to these extremely primitive, uh, sensorimotor, uh, subroutines. Right.
2:07:23
So, yeah, embodiment is important, but at the same time, uh, I think
2:07:30
the kind of body and sensorimotor affordance space that you have is very much a plug and play. If you have a true AGI, uh,
2:07:39
you could you could basically if you have an AGI, you could plug any environment, any sensorimotor space, any DSL as well into it.
2:07:51
Um, and it would start being intelligent about it, you know. So in that sense, like embodiment is important, but
2:07:59
what kind of embodiment might not, might not necessarily be important? Um, and, you know, uh, another thing that's really important
2:08:07
is goal setting, by the way, which is distinct from embodiment, is also distinct from intelligence. If you're just a brain in a jar, uh,
2:08:14
with with nothing to think about, well, you're not going to be very intelligent, but also you're not really going to be doing anything
2:08:21
because you have nothing to do. You have no goal, uh, to drive your thoughts. Um, and I think this is
2:08:32
especially true if you if you're looking at children, the way you learn anything is by setting goals and accomplishing them.
2:08:39
You cannot really build a good mental models or good,
2:08:46
good world models, uh, passively, purely by, you know, uh, observing what's going on around you, uh, with no goals of your own.
2:08:55
That's not how it works. Uh, goal setting is a critical component of any any intelligent agent. I completely agree.
4.5 Language as Cognitive Operating System
2:09:03
I think the only unresolved tension in my mind is that there are many manifestations of intelligence, and it is possible for us to build
2:09:11
an abstract, explicit version which would run on computers. Essentially, it doesn't necessarily need to mimic
2:09:18
the type of intelligence we have in the real world. Yeah, I think so. And I think it will probably have, at least in its first few iterations.
2:09:26
It will probably have significant architectural similarity with the way intelligence is implemented in people.
2:09:32
But, um, ultimately, you know, it might it might drift away towards,
2:09:37
towards entirely new types of intelligence. Now, you've said that language is the operating system of the mind.
2:09:44
What did you mean by that? Right. So what's an operating system? Right.
2:09:50
It's not the same thing as a computer. Um, it is something that makes your computer more usable and more useful.
2:10:00
It empowers computing for some user. Well, it empowers some user to
2:10:10
to to best leverage the capabilities of that computer. I think language plays a similar role for the mind.
2:10:16
I think language is distinct from the mind, like it's a separate thing from
2:10:22
from intelligence, for instance, or even from a world model. But it is a tool that you, as an agent, is leveraging to
2:10:32
make your mind, to make your thinking more useful. Right? So I believe language and thinking are separate things.
2:10:40
Language is a tool for thinking and what you use it for. Well, I think one way is that you can use language to make your thoughts
2:10:53
Respectable. Your thoughts are there. They're like programs in your brain
2:10:58
which you can execute to get the output, but you cannot really look at
2:11:04
them by writing them down in words. I don't mean like literally
2:11:10
writing them down, but just expressing them as words. Suddenly you can start reflecting on them. You can start looking at them.
2:11:18
You can start comparing them, and critically, you can start indexing them as well. I believe one of the rules of
2:11:26
language is to enable you to do indexing and retrieval over your
2:11:31
own ideas and memories. If you did not have language, then to
2:11:36
retrieve memories you would have to rely on external stimuli, right? Like, you know, a post is eating a madeleine and it's reminding
2:11:45
him of a specific time and place. And If a post did not have language,
2:11:54
then every time he he every time he needs to think about that
2:12:01
particular time and place, he would have to read the madeleine. This would be his only access point to that memory. Right. This external stimuli. If he has language,
2:12:08
then he can use language to try to query his own world model and
2:12:14
retrieve the memories that he wants. So it's it's a way to express
2:12:19
what you want to retrieve inside your own mind. It's also a way to compose together more complex thoughts.
2:12:27
If you cannot reflect on thoughts, if you cannot kind of like, materialize them and look at them and modify them in your mind, then I
2:12:36
think you are also quite limited in the in the complexities of the thoughts you can you can formulate. This has a very,
2:12:43
very simple programming analogy. By the way, if you have a computer, you can actually use it to write programs.
2:12:48
You do not need an operating system, right? You can just write in assembly code. Why not? But you are severely limited in terms of the complexity of the
2:12:58
software you can produce. If you have an operating system and you and you have, you know, high level programming languages and
2:13:07
so on, then these are tools that you can use as a programmer to to develop
2:13:14
much more complex software and your intelligence as a programmer, your programming ability has not changed. It's just your tools that have
2:13:20
gotten better, and suddenly you are much more capable that you were before, right? So I think intelligence is using
2:13:27
language as a similar kind of tool. Yeah. We have this information architecture of mediated abstractions at um,
2:13:37
it's almost like concentric circles, um, of of complexity. And in the language game they spoke about, you know, scissors or a
2:13:45
physical tool and language are the memetic equivalent of scissors. And of course, we can compose these tools together and use
2:13:51
them in different circumstances. But moving to consciousness a tiny bit. I mean, you suggested that consciousness emerges gradually in children.
2:13:59
How does this, you know, inform your views of machine consciousness? Right. So, I mean, to start with,
5.1 Consciousness and Intelligence Relationship
2:14:08
I am not that interested in the idea of machine consciousness. I'm specifically interested in intelligence and related aspects
2:14:16
of cognition. I think consciousness is a separate problem. Clearly, you know, it has some
2:14:25
relationship with intelligence. You see it, for instance, in the fact that, well, anytime you you use a system two thinking you
2:14:36
are aware of what you're doing, consciousness is involved. So clearly there is a relationship between consciousness
2:14:42
consciousness and system. Two the nature of this relationship is not entirely clear to me, and I also do not pretend that I
2:14:49
understand consciousness very well, and honestly, I don't believe that anyone does. So I'm always very suspicious when I
2:14:56
when I hear people who have a very, very detailed and precise and categorical ideas about about consciousness so that, you know,
2:15:04
I do believe that it's plausible that machine consciousness is possible in principle. I also believe that, um,
2:15:13
we don't have anything that resembles machine consciousness today. We're probably pretty far from it. Um, for for a system to be conscious,
2:15:23
you know, it would need. At the very least, it would need to be, uh, much more sophisticated than the
2:15:29
sort of like input to output mapping that you see in deep learning, deep learning models in Llms. Um, at the very least,
2:15:37
you would expect the system to have some kind of permanent state, um, that gets influenced by external stimuli, but that is not just
2:15:47
fully set by external stimuli. It has some kind of consistency
2:15:53
and continuity through time. It can influence its own future states. It is not purely a reactive right.
2:16:01
I think consciousness is in opposition to purely a reactive type systems like deep learning models or insects, maybe.
2:16:10
Um, and I don't think we have any, any system that looks like this today. I also think consciousness requires
2:16:16
the ability to introspect quite a bit like this, sort of like, uh,
2:16:22
self-consistent state of the system that is maintained across time.
2:16:27
It should have some way to represent and influence itself.
2:16:32
It should be self, self, self driving in a way. And we don't have anything like that today.
2:16:39
But in principle, you know, maybe, maybe it's possible Simple to build it. And so you mentioned this,
2:16:46
this thing I mentioned on Twitter, like this idea that, um, uh, babies are not born conscious, which apparently is extremely
2:16:54
controversial. So maybe I can I can say a little bit more about that. Um, so first of all, you know,
2:17:01
we have no real way of assessing with 100% certainty whether
2:17:06
anyone is conscious at any stage of development. Right. It's basically a guess. Um, it seems to me that babies in
2:17:15
the womb are very unlikely to be conscious because they are basically,
2:17:21
uh, they're basically fully asleep all the time, like, they're, uh, asleep. You know, they're in one of two
2:17:28
possible sleep states, like 95% of the time, there's a deep sleep where they're just, you know, inert, and there's active
2:17:37
sleep where they're moving around, you know, and, you know, the mother can can feel them move around. And when they're moving on,
2:17:45
they're not actually awake. They're actually asleep. It's just active sleep. And the remaining 5% is not
2:17:51
wakefulness. It's just transitions between deep sleep and active sleep. And the reason they are just sleeping all the time is that they're being sedated. Right?
2:18:01
The womb is very low oxygen pressure environment. And that's sedating them. And also the placenta and the
2:18:09
baby itself are producing a anaesthetic products. Basically the placenta is actually producing anaesthetics.
2:18:18
And so that's keeping the babies like in this, uh, dreamless sleep pretty much. Which doesn't mean, by the way,
2:18:25
that their brain is not learning. Their brain is not like just disconnecting and doing nothing. They are actually learning,
2:18:32
but they are learning in these very passive way. You know, they're just computing statistics about what's going on in
2:18:39
the environment, which is what brands do whether you're awake or asleep.
2:18:44
But yeah, I believe that babies in the womb are not conscious. And when they're born, they started at consciousness
2:18:52
level zero pretty much. And as they start being awakened, they start experiencing the world. Then consciousness starts to
2:19:01
light up. But it is not this sort of like instant switch where they go from, uh, being unconscious to being fully
2:19:09
conscious. It happens gradually. So you start at zero. And by the way, you kind of have to start at zero even after you wake up,
2:19:16
because when you're born, you have nothing to be conscious of. You know, like, um, pretty much everything, not just actions,
2:19:26
but even perception is something that you have to learn through experience. When you're born, you cannot even really see because
2:19:35
you have not learned to see. You know, you have not trained your visual cortex, right. So you can see maybe like blobs
2:19:42
of light. You cannot you do not have a model of yourself, of your own sensory motor affordances.
2:19:49
You have maybe a very crude proto model that you developed by moving around in the womb and having your brain kind of kind
2:19:56
of like map what's going on and, and correlations kind of like in
2:20:01
your sensory motor space. But it's not really a model. It's not a sophisticated model of anything.
2:20:07
So you have nothing to be conscious of. You have no world model, no model of yourself,
2:20:12
no real incoming perceptual stream, because you have not learned to
2:20:19
take control of your sensory motor affordances just yet. So you start at zero. And then as you build up these
5.2 Development of Machine Consciousness
2:20:26
models, your world model, your model of yourself, and so on, you start gradually, bit by bit, being more conscious And at some
2:20:37
point you you reach a level where you can be said to be fully conscious the way maybe like a dog might be fully conscious.
2:20:44
And I think it happens pretty fast. It happens probably significantly earlier than the first clear external signs of consciousness.
2:20:53
I think around one month old ish. The babies are probably conscious
2:20:59
to the same level as, you know, most most mammals, I suppose,
2:21:04
but that's still not adult level consciousness, right? Um, and I think adult level consciousness is something that
2:21:15
children only start experiencing around age 2 to 3. Doesn't mean that they were not conscious the whole time.
2:21:21
Like, again, they're conscious pretty much starting on day one. It's just to to very small amount. Right.
2:21:27
Um, and so consciousness is something that you have to build up over time.
2:21:32
At least that's my theory. And there are some sort of like indications that this is not entirely made up, basically.
2:21:42
Um, one example is if you try to observe attentional blink, uh,
2:21:49
try to measure it in children, you will see that basically up until age three, they have a significantly slower attentional blink than adults.
2:21:58
And they're going to pass, um, uh, the events around them into uh,
2:22:05
uh, fewer, fewer events so they can have a more coarse grained resolution of time and the world. And I think that actually, uh.
2:22:20
That that's, that's tied to this idea of level of consciousness. And I also have this this very, uh, probably controversial idea that,
2:22:28
well, so you reach adult level consciousness around, from age 2 to 3, roughly. But then you don't stop there.
2:22:36
You actually keep getting more and more conscious of your time, and your consciousness level probably peaks around age like 9 to 10.
2:22:44
And then then it goes in reverse. You get less and less conscious with every every passing year, but not to a very significant extent,
2:22:54
so that the the difference in degree of consciousness between,
2:22:59
um, I don't know, a 90 year old and a ten year old and
2:23:05
a three year old is actually very, very minor, but it is still there. And I think this, uh, plays into some things like, for instance,
2:23:13
our subjective perception of time. I think the more conscious you are, the higher your your level of consciousness,
2:23:21
the slower your perception of time, because your perception of time
2:23:26
is highly dependent on how many, um, things you can notice in any,
2:23:33
any time span. So one way you could conceptualize
2:23:38
your degree of consciousness is you can imagine consciousness is kind of like nexus in your world model. It's a focus point from which, um,
2:23:49
uh, from which span, like a bunch of connections to other things, uh,
2:23:54
connections that encode these, these focus points and give it meaning. And these connections, they can be they can be, uh, they can be fewer
2:24:04
of them or more of them, and it can be more or less deep. Right. And the deeper the connections, the more you have,
2:24:10
the more conscious you are. And there's also this, this temporal component where, uh, if you're highly conscious,
2:24:19
then even in a one second you might be noticing many things and drawing many connections between these things and things, you know, that's that's
2:24:29
a higher level of consciousness. On the other hand, if you're if you're noticing very few things, if you have a very coarse
2:24:35
grained perception of reality that is evolving and you're only
2:24:40
noticing few things in, in any, any time span, then you are you
2:24:46
have a faster perception of time. Like things just pass in a blink. Um, and that's that's the lower level questions.
2:24:54
Like, if you drink a lot of booze, you have reduced consciousness,
2:24:59
right? And things will actually seem to move faster. And you will notice fewer things. And the depth of connections that you establish between things is less.
2:25:08
Um, I think something like, you know, if you're if you're a
2:25:13
one year old toddler, you have a much lower attentional blink.
2:25:19
Your perception of time is likely very, very fast. And we have decided that children perceive time slower.
2:25:27
I think that's true, but it really depends on your age. I think if you're one time is super fast because again, you're at this
2:25:36
lower level of consciousness. If you're three, it's basically adult level. But if you're ten, it's actually pretty slow, right? Or if you're seven,
2:25:43
it's it's slow as well. It actually gets slower and slower and slower until until it peaks around age like 9 or 10.
2:25:48
Then it starts getting faster again because you're less and less conscious. At the time, I remember being very bored when I was a child. I've not felt bored in as long as
2:25:56
I can remember, and I interviewed professor Mark Solms recently. He's got a great book called The Hidden Spring,
2:26:01
and his basic idea is that consciousness is prediction errors. So the more you know, like your conscious,
2:26:08
when you first learn how to drive, so the more things become automated, the less conscious we are. And then maybe time goes faster
2:26:14
in many ways as we grow up. But this idea of being more or less conscious is really interesting. As you say, it's like a dimmer switch, but on the machine sentience thing.
2:26:23
I remember you came on the show to talk about the Chinese room argument, and you said understanding is a virtual property of functional
2:26:30
dynamics in the system. And presumably you would also argue that consciousness is a virtual property of functional dynamics
2:26:36
in the system, I think so. I think it is not strongly tied to substrate. So in principle,
2:26:42
you should be able to implement consciousness using derived functional dynamics in silicon. Yes. Theoretically, I don't think we
2:26:49
have it or that we are close to having it, but in principle I don't see a problem with that. Yes, and we'll leave the hard problem
2:26:55
of consciousness to one side. By the way, Mark Solms was quite dismissive about the hard problem of consciousness, which is that there is
2:27:01
something it is like to be conscious. Well, I think there is. I'll go on. There is? Yeah. Like some people dismiss. Yeah.
2:27:09
Some people dismiss the problem of consciousness saying. Yeah. No. Like something like consciousness is what it feels to be an information
2:27:15
processing system or things like that. It really means nothing. It's just pushing the problem back to where you can better
2:27:23
control it with words, but it's not reducing the problem. And there is clearly such a thing as qualia, and you are
2:27:30
experiencing them right now, so you cannot deny that they exist. And we have no way to explain or even describe what they are like.
2:27:37
You can describe many things about consciousness, but the the
2:27:43
subjective experience is not reducible to to these explanations. There is something and we don't know what that is.
2:27:52
And you think we have it and animals have it, but yes, animals have it.
2:27:58
I mean, not all animals. And again, like I believe in this idea of degrees of consciousness and animals probably have it to
2:28:09
a lesser extent than we do. It might it might not be a huge difference, by the way, but it's probably less. Yeah.
2:28:14
Do you think the Earth could be conscious to some degree? No, I don't think so. I think, um, non-animal systems
2:28:23
typically lack the basic prerequisites that I would want to see in a system to even start entertaining the notion that it might
2:28:30
be conscious, like, for instance, the ability to maintain, um, this,
2:28:36
uh, self influenced, self-consistent inner state across time that's
5.3 Consciousness Prerequisites and Indicators
2:28:44
influenced by perception, but that, that is also capable of driving
2:28:49
itself, pretty much influencing its own future state that's, uh, capable of representing itself, introspecting and so on.
2:28:58
I don't think you see that in non-biological systems today. Do you think the collective of all Americans could be seen as a
2:29:04
conscious being? No. Why not? Again, because it lacks these
2:29:09
basic prerequisites. So it needs to be a physical form of
2:29:16
connectedness to the surroundings. It couldn't. There couldn't be a virtual version distributed over many agents.
2:29:23
You know, you could definitely imagine a distributed version. It's just that I'm not saying the collective of all Americans,
2:29:29
for instance, implementing this, uh, self influenced, self-consistent
2:29:36
state that's capable of representing itself and the world and so on.
2:29:42
And even then, you know, even if you have these things in a software system, for instance, it's not automatically conscious.
2:29:48
It's just that it starts being plausible that it might be conscious if you also see, uh, signs like, uh, pretty clear signs that it might be
2:30:00
so. What what might be such a sign? Well, it's difficult, and I don't
2:30:05
think that you're ever going to see a, um, a proof of consciousness,
2:30:13
a proof of consciousness that works. And at the time, I think it's always kind of kind of a guess. But typically, you know,
2:30:21
I think it's highly likely that the system is conscious if it has all these prerequisites and it is capable of expressing statements
2:30:30
about its own inner state. Um, that cannot be, uh,
2:30:36
purely a product of repeating something the system has heard.
2:30:43
You know, like if you ask an LLM about how it feels and so on, it will answer something, but it's really just rehashing
2:30:51
something it has read. So what I would want to see is the system is making statements about how it feels, and there seems to be
2:30:59
a strong correlation between the behavior of the system and what it is telling me, and what it is telling me is unlike anything that
2:31:08
the system has seen elsewhere before. Like, I don't know, I'm, uh,
2:31:15
holding my my two year old and trying to console them because, um, they're crying and I'm like, hey, you shouldn't cry. Stop crying.
2:31:24
And they're like, but I want to cry. That's how I feel like, well,
2:31:30
there's a pretty strong correlation between what the child is doing and what they're saying about themselves. So you can believe them.
2:31:37
And they've never heard anyone saying, I want to cry. It's they're really expressing something they could they could not
2:31:45
have picked up from anywhere else. You know? So in this situation, it's just highly plausible.
2:31:51
It is not proof of anything. It is highly plausible that they, in fact, do have some awareness of their own mental states, and they're
2:32:01
expressing something about them and they are actually conscious. They are experiencing qualia, you know.
2:32:06
So, Francois, you've been very critical of Singularitarianism and and Doomerism. What do you think is the driving
2:32:14
force of these extreme views? Well, you know,
2:32:20
I think there are good stories, like stories about the end of
2:32:26
the world, this idea that we are living in the end times and maybe that we have a role to play in it. Um, these are these are good stories,
2:32:35
which is why you find them a lot in fiction. Like in science fiction, for instance. You find them a lot in religion as well, and they're not new.
2:32:43
They've been they've been around for thousands of years. So I think that's the primary driving force.
2:32:49
It's just that they are they are good as memes. They are good stories.
2:32:55
People want to believe them. And they're also very easy to retain and propagate. And that's that's really the
2:33:02
main thing. And you know, everyone is just craving meaning to organize their lives around, which is why cults are
2:33:14
still a problem in our day and age. And that's just an instance of that, I think. Do you think there's a bit of a
2:33:22
messiah complex as well? Absolutely. Yeah, absolutely. I think you see it a lot in the in the San Francisco Bay area.
2:33:31
There are people who have kind of latched onto this idea of building
2:33:36
AGI and who are using it to sort of like, picture themselves as Messiah,
2:33:42
as you say. Personally, I see creating AGI as a scientific problem, not not a religious quest.
2:33:50
You know, and this is often, um, kind of merging together with
2:33:55
the idea of eternal life, by the way, which is of course, very natural because the story in most religions is always about this,
2:34:07
this combination of, um. Anyway. Um, but yeah, it's,
2:34:12
it's kind of merging as well with this idea of eternal life. Right.
2:34:17
That if you create AGI, it will it will make you live forever.
2:34:23
Pretty much. So it's this very religious idea, right? Um, and it has become this
2:34:29
religious quest to get there first. And whoever gets there first
2:34:36
will become as gods, right? So I'm not really subscribing to any of that. I think building AGI is a
2:34:44
scientific problem. And once you build AGI, it's basically just going to be a very useful and valuable tool.
2:34:52
It is going to be, you know, as, as I mentioned, a pathfinding algorithm in future situation space, it's going to be a piece of software
2:35:00
that takes in information about the problem and is capable of very efficiently synthesizing a model of that problem, which you can use to
2:35:08
make decisions about the problem. So it's a valuable tool, but it does not turn you into God. And certainly you can use it in
2:35:17
scientific research, and maybe you can use it in longevity research, but it does not automatically make you immortal because it is
2:35:24
not omnipotent. I think if you start having very powerful ways to turn information into actionable models, your
2:35:33
bottleneck quickly starts becoming the information that you have. So, for instance, if you have an AGI that can do physics, it can quickly
2:35:42
synthesize new physics theories. Um, the thing is, uh,
2:35:48
human scientists today, they are already very, very good at that. They are, in fact, too good. They are so good that their ability
2:35:57
to synthesize plausible new theories far exceeds our ability to collect experimental data to validate them. That's what that's what you see with
2:36:04
string. String theory, for instance. Um, and that's, that's a pretty stark
2:36:10
illustration of the fact that if you're too smart, then you start, you start running kind of like free, uh, of information.
2:36:19
And that starts not being very useful anymore. Right? Uh, applied intelligence is grounded in, in experimental data.
2:36:27
And if you are very intelligent, then experimental data becomes a bottleneck. So it's not like you're going to see
2:36:33
a runaway intelligence explosion. Is there anything that would make you change your mind? I mean, again, I had this discussion
5.4 AGI Safety Considerations
2:36:39
with Greenblatt, and I try and avoid having x-risk discussions when I'm actually debating. And a lot of it hinges on agency.
2:36:47
So I said, because I don't think systems are essential or will be, I don't see the problem because a lot of the the mythos around this,
2:36:54
you know, the bostrom's ideas around instrumental convergence and orthogonality, it's all goals. It's all agency based.
2:37:00
So no agency, no problem. Presumably you agree, but you know, maybe if there was agency, would you think there was a problem? Yeah.
2:37:08
No, I think intelligence is separate from agency, is separate from goal setting. If you just have intelligence in
2:37:15
isolation, then again, you have a way to turn information into actionable models. But it is not self-directed.
2:37:23
It is not able to set its own goals or anything like that. Goal setting has to be an add on an external component that you plug
2:37:31
into it. Now you could imagine that. Well, what if you combine this AGI with an autonomous goal setting system?
2:37:38
With a value system, you turn all of that into an agent and then you you give it access to the nuclear codes, for instance, or something like that.
2:37:47
Is that dangerous? Well, yes. But you've kind of engineered that danger in a very deliberate fashion, right?
2:37:55
I think once once we have AGI, we'll have a plenty of time to
2:38:01
kind of, a anticipate this kind of potential risk.
2:38:08
So I do believe, you know AGI will be a powerful technology.
2:38:13
So this is exactly what makes it valuable and useful. Um, anything powerful is also potentially risky,
2:38:20
but we are very much going to be the ones in control because AGI on
2:38:26
its own cannot set goals until you actually create an autonomous goal.
2:38:32
Goal setting mechanism. But why would you do that? You know, so the difficult part, the dangerous part is not the
2:38:40
intelligence bit. It's more like the, the the goal setting and action space bits. And if you want to create something
2:38:50
very dangerous that creates, that sets its own goals and takes action in the real world, you do not actually need very
2:38:59
high intelligence to do so. You can already do so with very crude techniques, right? So the thing is existential risk.
2:39:07
I mean, it's a legitimate form of inquiry and especially nuclear risk, for example. And I know many of these folks,
2:39:14
they're not just solely focused on AI existential risk. They're looking at other risks as well. But how do you view the incentives? I mean, you could be really cynical
2:39:21
and just say, oh, effective altruism and open philanthropy. They're throwing lots of money at this.
2:39:27
And what they actually want is power and control. How do you how do you kind of think about this?
2:39:34
Well, there's there's definitely a bit of that. Also, I think a lot of the true believers there just buy into it
2:39:42
because they want to believe. And it's again, it's very parallel
2:39:47
to religious ideas in many ways. So I don't think it's it's very
2:39:53
rational, you know. So that said, you know, once we
2:39:58
have AGI, because today we don't. And I don't think we're particularly close to it. But once we have it,
2:40:03
then we can start thinking about the risks that are involved. I don't think you're going to see, you know, uh, the day, the day you
2:40:13
just start running the program, it becomes self-aware and takes control of your lab and so on. I don't think you're going to
2:40:20
see anything like that. Uh, again, intelligence, AGI is just a piece of software that can turn data into models.
2:40:26
It's up to you to use it in certain way. Right? I mean, like an abstract way to think about this is framing it as
5.5 AI Regulation Framework
2:40:34
safety ism and governance in general. So if we take away the hyperbolic x risk and we talk about, um, you know, misinformation and things like that,
2:40:42
what do you think about that? Um. I mean,
2:40:49
maybe I should be more specific. I mean, uh, you know, deepfakes and misinformation and infringement of copyright and so on.
2:40:56
Do you think that we should strongly regulate this, or would it harm innovation if we did? I think there are definitely
2:41:05
harms that can be caused by current technology, by current and near-term uses of AI. And yes,
2:41:17
I think some form of regulation might be useful to protect the public against some of these harms. I also think that the the regulation
2:41:26
proposals that I've seen so far are not really satisfactory. They are more, uh, leaning towards harming, uh, innovation,
2:41:36
um, than protecting the public. I think ultimately they will they're
2:41:41
more they're more likely to end up concentrating power in the AI space
2:41:50
than just protecting the public. Um, so I think regulating AI is
2:41:55
difficult, and just relying on existing non AI
2:42:01
regulation to protect people might be the better course of action.
2:42:08
Given that introducing new AI specific regulation, um,
2:42:13
is you know, it's it's it's it's difficult problem. And I don't think based on what I've seen so far, I don't think we're
2:42:20
going to do a very good job at it. Francois Chollet, it's been an honor and a pleasure. Thank you so much. It's my pleasure.
2:42:26
Thanks. Thanks so much for having me. Amazing.
