import os
import json
import requests
import click

EM_URL = os.environ.get('EM_URL', None)
APP_ID = os.environ.get('APP_ID', None)


@click.group()
def tool():
    pass

@tool.command()
@click.option('--app', default=APP_ID)
@click.option('--em', default=EM_URL)
def config(app: str, em: str):
    if em is None:
        click.echo('EM url not set, use EM_URL env or --em flag')
    else:
        response = requests.get(f'{em}/api/v1.0/applications/{app}/')

        if response.status_code != 200:
            click.echo(f'Cant request Application {app}, check EM url or server state')
        else:
            a = response.json()
            with open('/usr/share/nginx/html/index.js', 'w') as fp:
                fp.write(f'window.coreConfig = {json.dumps(a["core_config"])}')

            with open('/usr/share/nginx/html/manifest.json', 'w') as fp:
                json.dump(a['core_manifest'], fp)

@tool.command()
@click.option('--app', default=APP_ID)
@click.option('--fragment', required=False, default=None)
@click.option('--em', default=EM_URL)
def update(app: str, fragment: str, em: str):
    if em is None:
        click.echo('EM url not set, use EM_URL env or --em flag')
    else:
        url = f'{em}/api/v1.0/fragment/?rql=eq(application,{app})' + (f',eq(id,{fragment})' if fragment else '')
        response = requests.get(url)

        if response.status_code != 200:
            click.echo('Cant request Fragments, check EM url or server state')
        else:
            for f in response.json():
                with open(f'/usr/share/nginx/html/fragments/{f["alias"]}.json', 'w') as fp:
                    json.dump(f['config'], fp)


if __name__ == "__main__":
    tool()
