import { NextRequest, NextResponse } from 'next/server';
import { execSync } from 'child_process';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { cmd } = await req.json();
    if (!cmd) {
      return NextResponse.json({ error: 'Missing cmd' }, { status: 400 });
    }
    const stdout = execSync(cmd, {
      cwd: process.cwd(),
      encoding: 'utf8',
      env: {
        ...process.env,
        PATH: `/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin:${process.env.PATH || ''}`,
      },
    });
    return NextResponse.json({ success: true, stdout });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stdout: error.stdout?.toString(),
        stderr: error.stderr?.toString(),
      },
      { status: 500 }
    );
  }
}
