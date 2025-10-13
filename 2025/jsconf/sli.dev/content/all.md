# The Content Addressable Web - Kinetic Typography DSL

## Slide 1: Title
---
background: writing.jpg
timing: dramatic
line-spacing: lg
align: center
---
___all_docs___ [align:center]
*TOWARDS A CLOUD NATIVE* [cyan, align:center]
*REGISTRY AT EDGE* [pink, align:center, space-after:xl]
__Or what__ [align:center]
*MIKEAL ROGERS* [green, align:center]
__taught me about__ [align:center]
*DATABASES, ANARCHY & LIFE* [yellow, align:center]

## Slide 2: Introduction
---
timing: fast
align: center
---
*CHARLIE ROBBINS* [cyan, align:center, space-after:lg]
__You might know me from__ [align:center]
*SUCH PLACES AS THE INTERNET* [pink, align:center, space-after:xl]
---
Principal Engineer [band:purple]
@ CHAINGUARD [band:pink]
Keeping NPM Safe [band:dark]

## Slide 3: Core Learning
---
background: thinking.gif
timing: dramatic
line-spacing: lg
align: center
---
__What did I learn from__ [align:center, space-after:md]
*MIKEAL ROGERS?* [green, align:center, space-after:xxl]
__The web__ [align:center]
*ISN'T FINISHED* [cyan, align:center, space-after:lg]
__JavaScript is fine...__ [align:center]
*FINISHED EVEN* [yellow, align:center, space-after:md]
__But the infrastructure?__ [align:center]
*THAT'S WHAT WE NEED* [pink, align:center]

## Slide 4: Infrastructure Vision
---
background: building.gif
timing: normal
align: center
---
*PUBLIC DOMAIN* [cyan, align:center, space-after:md]
__It must live in the__ [align:center, space-after:lg]
*DECENTRALIZED* [green, align:center]
__from any__ [align:center]
*NATION STATE'S CONTROL* [pink, align:center, space-after:xl]
__We got lucky with DNS__ [align:center]
*WE CANNOT* [yellow, align:center]
*MAKE THAT BET AGAIN* [yellow, align:center]

## Slide 5: PKV Manifesto
---
timing: dramatic
align: center
---
*PKV MANIFESTO* [green, align:center, space-after:lg]
__Mikeal's last work__ [align:center]
__before he got sick__ [align:center, space-after:xl]
__We were working on__ [align:center]
*SAVING THE WORLD* [cyan, align:center, space-after:md]
__Quite literally__ [align:center, space-after:lg]
*CLIMATE SCIENCE* [yellow, align:center]

## Slide 6: CouchDB Origin
---
background: hello.gif
timing: normal
line-spacing: md
align: center
---
🛋️ [align:center, space-after:md]
*ONE MUST FIRST RELAX* [cyan, align:center, space-after:lg]
__Take a seat__ [align:center]
__Here's my couch__ [align:center, space-after:xl]
__I met Mikeal when he was__ [align:center]
*DEVELOPER EVANGELIST* [green, align:center]
__before the term existed__ [align:center, space-after:lg]
__for__ [align:center]
*COUCH ONE* [pink, align:center]

## Slide 7: NPM Weekend
---
background: working-homer.gif
timing: fast
align: center
---
__Mikeal wrote the__ [align:center]
*NPM REGISTRY* [cyan, align:center, space-after:md]
__in a__ [align:center]
*WEEKEND* [pink, align:center, space-after:lg]
__as a CouchDB__ [align:center]
*EXAMPLE APP* [yellow, align:center]

## Slide 8: Gall's Law
---
timing: dramatic
align: center
---
*GALL'S LAW* [green, align:center, space-after:lg]
___A complex system that works___ [align:center]
___is invariably found___ [align:center]
___to have evolved from___ [align:center]
___a simple system that worked___ [align:center, space-after:xl]
---
Weekend Project [band:pink]
Far From Perfect [band:purple]
Insufficient at Scale [band:dark]
But It WORKED [band:green]

## Slide 9: The Putument™
---
background: cat-run-type.gif
timing: dramatic
align: center
---
__Say hello to the__ [align:center]
*PUTUMENT™* [green, align:center, space-after:lg]
__Mikeal's most__ [align:center]
*INGENIOUS DESIGN* [cyan, align:center, space-after:xl]
__Makes NPM's publishing__ [align:center]
*UNIQUELY ATOMIC* [pink, align:center, space-after:md]
__in a world where atomicity is__ [align:center]
*FUCKING HARD TO COME BY* [yellow, align:center]

## Slide 10: Putument vs Packument
---
timing: fast
align: center
---
*PUTUMENT* [green, align:center]
__≠__ [align:center]
*PACKUMENT* [pink, align:center, space-after:xl]
__Partial__ [align:center]
*PU* [cyan, align:center]
__blish doc__ [align:center]
*UMENT* [cyan, align:center, space-after:lg]
__After attachments separated__ [align:center]
*DISTINCT ENTITY* [yellow, align:center]

## Slide 11: CouchDB Features
---
timing: normal
align: center
---
*COUCHDB* [cyan, align:center]
__Before distributed was cool__ [align:center, space-after:xl]
---
_changes [band:purple]
The feed you know [band:dark]
_all_docs [band:pink]
The one we'll talk about [band:dark]
Append-only JSON [band:green]
B-tree balanced on compaction [band:dark]

## Slide 12: Tombstones
---
background: thinking.gif
timing: normal
align: center
---
*TOMBSTONES* [pink, align:center, space-after:lg]
__In an append-only store__ [align:center]
__a record of deletion__ [align:center, space-after:lg]
___"Hey, this thing___ [align:center]
___isn't there anymore"___ [align:center, space-after:xl]
__At scale, these become__ [align:center]
*QUITE SIZABLE* [yellow, align:center]

## Slide 13: Federated Registry
---
timing: dramatic
align: center
---
__Federated Registry of__ [align:center]
*~~SCIENTIFIC~~* [pink, align:center]
*SOME THINGS* [green, align:center, space-after:xl]
__Why just scientific?__ [align:center]
__Why not__ [align:center]
*ALL THE THINGS?* [cyan, align:center]

## Slide 14: Fragmentation Problem
---
timing: fast
align: center
---
*INHERENT FRAGMENTATION* [yellow, align:center, space-after:lg]
__Isolated registries__ [align:center]
__No economy of scale__ [align:center, space-after:xl]
__True scale only exists when__ [align:center]
*MERGED AT THE SERVICE LAYER* [cyan, align:center]
__and federated__ [align:center]
*SAFELY FOR READS* [green, align:center]

## Slide 15: The Sandworm
---
background: sandworm.gif
timing: dramatic
align: center
---
__When the worm comes__ [align:center]
*THERE IS NO ESCAPE* [pink, align:center, space-after:lg]
__You either__ [align:center]
*RIDE* [green, align:center]
__or you__ [align:center]
*DIE* [yellow, align:center, space-after:xl]
___Fremen philosophy___ [align:center]

## Slide 16: Safe Federation
---
timing: normal
align: center
---
*SAFE FEDERATION* [cyan, align:center, space-after:lg]
__Requires knowing__ [align:center]
*WHAT IS SAFE TO SERVE* [pink, align:center, space-after:xl]
---
Advisory Feeds [band:purple]
Rapid Notifications [band:pink]
Lightweight Responses [band:green]
Cryptographic Verification [band:dark]

## Slide 17: Metadata Focus
---
timing: dramatic
align: center
---
__You don't need the__ [align:center]
*CONTENT* [pink, align:center, space-after:md]
__No tarballs__ [align:center]
__No JARs__ [align:center]
__No wheels__ [align:center, space-after:lg]
__Only__ [align:center]
*METADATA* [green, align:center, space-after:xl]
___Mikeal's key insight___ [align:center]

## Slide 18: Climate Data
---
background: earth.gif
timing: normal
align: center
---
*NPM TARBALLS* [cyan, align:center]
__are immutable__ [align:center, space-after:lg]
*EARTH OBSERVATION DATA* [green, align:center]
__equally immutable__ [align:center, space-after:xl]
__This immutable nature of__ [align:center]
*WHAT WE ALL WANT* [pink, align:center]
__is the key__ [align:center]

## Slide 19: Orders of Magnitude
---
timing: dramatic
align: center
---
__10 years ago__ [align:center]
*340,000* [yellow, align:center]
__packages__ [align:center, space-after:xl]
__Today__ [align:center]
*3,400,000* [green, align:center]
__packages__ [align:center, space-after:xl]
*10X GROWTH* [pink, align:center]
__= completely new problems__ [align:center]

## Slide 20: Death of _all_docs
---
background: cat-run-type.gif
timing: normal
align: center
---
```
curl https://registry.npmjs.org/-/all
```
__Dies after hours__ [align:center, space-after:lg]
*NO RESUME CAPABILITY* [pink, align:center, space-after:xl]
__The community helped__ [align:center]
*GUY BEDFORD* [cyan, align:center]
*BRAD FARIAS* [green, align:center]
__via LinkedIn__ [align:center]

## Slide 21: Lexicographic Pivots
---
timing: fast
align: center
---
__Solution:__ [align:center]
*PARTITION THE B-TREE* [green, align:center, space-after:lg]
__Use start_key and end_key__ [align:center, space-after:md]
*~1,200 PARTITIONS* [cyan, align:center]
__of__ [align:center]
*~10,000 DOCUMENTS* [pink, align:center]
__each__ [align:center, space-after:lg]
*LEXICOGRAPHIC PIVOTS* [yellow, align:center]
__for boundaries__ [align:center]

## Slide 22: Download Count Problem
---
timing: dramatic
align: center
---
*34 MILLION* [cyan, align:center]
__versions__ [align:center]
__×__ [align:center]
*365 DAYS* [green, align:center]
__×__ [align:center]
*10 YEARS* [pink, align:center]
__=__ [align:center, space-after:lg]
*124 BILLION* [yellow, align:center]
*DATA POINTS* [yellow, align:center]

## Slide 23: Zarr Solution
---
timing: normal
align: center
---
__Computers really are just for__ [align:center]
*FINANCE & ADVERTISING* [pink, align:center, space-after:lg]
__(tabular data)__ [align:center, space-after:xl]
*ZARR* [green, align:center]
__Like Parquet but for__ [align:center]
*MULTI-DIMENSIONAL DATA* [cyan, align:center, space-after:lg]
__Turn 124 billion requests into__ [align:center]
*365 PER YEAR* [yellow, align:center]

## Slide 24: MikealConf
---
background: hello.gif
timing: slow
align: center
---
__Tomorrow there will be__ [align:center]
*MIKEALCONF* [green, align:center, space-after:lg]
__Come talk about Mikeal__ [align:center]
__for 10 minutes__ [align:center, space-after:lg]
__In the vein of__ [align:center]
*TENCONF* [cyan, align:center, space-after:xl]
__And with that__ [align:center, space-after:lg]
*GOODBYE* [pink, align:center]
*MR. ROGERS* [yellow, align:center]

## Slide 25: Resources
---
timing: instant
---
@_all_docs/cache [band:purple]
Fastly Compute@Edge [band:pink]
PKV Manifesto [band:green]
github.com/indexzero [band:dark]