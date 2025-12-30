import { Hero } from "@/components/Hero";
import { ServerStatus } from "@/components/ServerStatus";
import Link from "next/link";
import { Youtube } from "lucide-react";

export default function Home() {
  return (
    <div className="pb-20">
      <Hero />

      {/* Floating Status Section */}
      <div className="px-4 relative z-10 mt-10">
        <ServerStatus />
      </div>

      <div className="mx-auto mt-24 max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-bold text-foreground">なみサーバーとは？</h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          なみサーバーは2025年8月に公開されたクロスプレイ対応サーバーです。<br />
          今まで、約1700名の方に参加していただき、最高同時接続数は76人を記録しました。<br />
          <span className="text-sm opacity-70">※2025年12月時点での記録です。</span>
        </p>

        <div className="mt-8 flex justify-center">
          <a
            href="https://www.youtube.com/@Lunaa_MC"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-white transition-transform hover:scale-105 shadow-lg hover:shadow-red-600/30"
          >
            <Youtube className="h-5 w-5" />
            公式YouTubeチャンネル
          </a>
        </div>
      </div>

      <section className="mx-auto mt-32 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-bold text-blue-500 mb-6">
            Features
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">サーバー紹介</h2>
          <p className="mt-4 text-muted-foreground">なみサーバーで遊べる主なゲームモード</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Minigame Server */}
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-xl hover:border-primary/50 dark:shadow-none dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <h3 className="relative mb-6 text-2xl font-bold text-foreground flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-primary" />
              ミニゲーム
            </h3>
            <div className="relative space-y-6 text-muted-foreground">
              <div>
                <h4 className="font-bold text-foreground">■ TNTRUN</h4>
                <p className="mt-1">足元のブロックがどんどん消えていく中で、最後まで落ちずに走り続けるゲーム。走るルートやスピード、他のプレイヤーとの駆け引きが勝敗を分けます。手に汗にぎる “奈落に落ちたら終了” のサバイバルレース！</p>
              </div>
              <div>
                <h4 className="font-bold text-foreground">■ DUEL</h4>
                <p className="mt-1">1対1で戦うガチの決闘モード。装備はゲーム開始時に渡され、腕と読み合いだけで勝負が決まります。「タイマンで勝負したい！」という時にぴったり。</p>
              </div>
              <div>
                <h4 className="font-bold text-foreground">■ BLOCKPARTY</h4>
                <p className="mt-1">リズムに乗って踊りながら、指定された色の床へ素早く移動する、シンプルながら中毒性の高いゲーム・・・など</p>
              </div>
            </div>
          </div>

          {/* Nation Server */}
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-xl hover:border-primary/50 dark:shadow-none dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <h3 className="relative mb-6 text-2xl font-bold text-foreground flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-primary" />
              国家サーバー
            </h3>
            <div className="relative space-y-4 text-muted-foreground">
              <p>なみ鯖の国家では、土地を買って自分の家や町を作ったり、みんなで国を発展させたりしながら自由に遊べます。</p>
              <p>働いたりお店を開いたりしてお金を貯め、自分の町をどんどん大きくしていく楽しさがあります。</p>
              <p>ワールドは地図で確認できるので、位置関係が分かりやすく、探索や建築計画もしやすい環境です。建国した場所の建物はしっかり保護されているので、壊される心配をせずに安心して建築できます。</p>
              <p>初心者でものんびりと、上級者はとことん発展を目指して、どんな遊び方もOK。チャットはDiscordとも連携しているので、連絡や会話がスムーズです。</p>
              <p className="font-bold text-foreground/90">仲間と一緒に“自分たちの国”を作り上げてみたい人にぴったりのサーバーです！</p>
            </div>
            <div className="mt-8 relative z-10">
              <a
                href="http://nami-kokka-map.mcsv.win:3377/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80 hover:text-primary"
              >
                国家サーバーマップを見る
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
